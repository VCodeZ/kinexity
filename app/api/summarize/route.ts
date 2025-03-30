import { NextRequest, NextResponse } from 'next/server';

interface DeepSeekMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface DeepSeekRequestBody {
  model: string;
  messages: DeepSeekMessage[];
}

interface DeepSeekResponse {
  id: string;
  model: string;
  object: string;
  created: number;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
}

interface SummaryResponse {
  summary: {
    tldr: string;
    bullets: string[];
    paragraph: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Get the API key from environment variables
    const apiKey = process.env.DEEPSEEK_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'DeepSeek API key not configured' },
        { status: 500 }
      );
    }

    // Parse the request body to get the transcript
    const body = await request.json();
    const { transcript } = body;

    // Check if transcript is provided
    if (!transcript) {
      return NextResponse.json(
        { error: 'Missing transcript' },
        { status: 400 }
      );
    }

    // Prepare the prompt for DeepSeek
    const prompt = `Please summarize the following transcript in three formats:

1. A one-sentence TL;DR
2. Bullet point summary
3. Detailed paragraph summary

Transcript:

${transcript}`;

    // Prepare the request to DeepSeek API
    const deepseekBody: DeepSeekRequestBody = {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    };

    // Make the request to DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(deepseekBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('DeepSeek API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get summary from DeepSeek' },
        { status: response.status }
      );
    }

    const data: DeepSeekResponse = await response.json();
    
    // Extract the summary from DeepSeek response
    const summaryText = data.choices[0]?.message.content;
    
    if (!summaryText) {
      return NextResponse.json(
        { error: 'Empty response from DeepSeek' },
        { status: 500 }
      );
    }

    // Parse the summaries
    const parsedSummary = parseSummaryFromDeepSeekResponse(summaryText);

    // Return the formatted summary
    return NextResponse.json({
      summary: parsedSummary
    });
  } catch (error) {
    console.error('Error processing summarize request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

/**
 * Parses the DeepSeek response to extract the different summary formats
 */
function parseSummaryFromDeepSeekResponse(text: string): SummaryResponse['summary'] {
  // Default values
  let tldr = '';
  let bullets: string[] = [];
  let paragraph = '';

  // Try to extract the TL;DR (one-sentence summary)
  const tldrMatch = text.match(/TL;DR:?(.*?)(?:\n\n|\n(?=\d\.)|$)/i);
  if (tldrMatch && tldrMatch[1]) {
    tldr = tldrMatch[1].trim();
  }

  // Try to extract bullet points
  const bulletSection = text.match(/Bullet point summary:?(.*?)(?:\n\n|\n(?=\d\.)|$)/i);
  if (bulletSection && bulletSection[1]) {
    bullets = bulletSection[1]
      .split(/\n\s*[-•*]\s*/) // Split by bullet point markers
      .filter(Boolean) // Remove empty strings
      .map(bullet => bullet.trim());
    
    // If we didn't get any bullets with the above regex, try another pattern
    if (bullets.length <= 1) {
      bullets = bulletSection[1]
        .split(/\n+/) // Split by newlines
        .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
        .map(bullet => bullet.replace(/^[-•*]\s*/, '').trim());
    }
  }

  // Try to extract paragraph summary
  const paragraphMatch = text.match(/Detailed paragraph summary:?(.*?)(?:\n\n|$)/i);
  if (paragraphMatch && paragraphMatch[1]) {
    paragraph = paragraphMatch[1].trim();
  }

  // If our regex approach failed, try a simpler approach
  if (!tldr && !bullets.length && !paragraph) {
    const parts = text.split(/\n\n+/);
    if (parts.length >= 3) {
      tldr = parts[0].replace(/^.*TL;DR:?\s*/i, '').trim();
      
      // For bullets, look for a section with multiple lines starting with - or •
      const potentialBulletSection = parts.find(p => 
        p.includes('\n') && 
        (p.includes('- ') || p.includes('• '))
      );
      
      if (potentialBulletSection) {
        bullets = potentialBulletSection
          .split('\n')
          .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
          .map(bullet => bullet.replace(/^[-•*]\s*/, '').trim());
      }
      
      // For paragraph, use the last substantial part
      for (let i = parts.length - 1; i >= 0; i--) {
        if (parts[i].length > 100) {
          paragraph = parts[i].trim();
          break;
        }
      }
    }
  }

  return {
    tldr: tldr || "Unable to generate a one-sentence summary.",
    bullets: bullets.length ? bullets : ["Unable to generate bullet points."],
    paragraph: paragraph || "Unable to generate a detailed summary."
  };
} 