import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get the videoId
    const body = await request.json();
    const { videoId } = body;

    // Check if videoId is provided
    if (!videoId) {
      return NextResponse.json(
        { error: "Missing videoId" },
        { status: 400 }
      );
    }

    // Return the mock transcript
    return NextResponse.json({
      transcript: `This is a mock transcript of the video with ID ${videoId}. The video talks about productivity hacks, mindset, and daily habits.`
    });
  } catch (error) {
    console.error('Error processing transcript request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

/**
 * Generates a mock transcript for the provided videoId
 * This will be replaced with actual transcript fetching logic later
 */
function generateMockTranscript(videoId: string): string {
  // Mock transcripts for demonstration
  const mockTranscripts: Record<string, string> = {
    default: `This is a mock transcript for video ID: ${videoId}. 
    
    In this video, we discuss the importance of artificial intelligence in modern technology. 
    
    Machine learning models have revolutionized how we approach problem-solving in various industries.
    
    From healthcare to finance, AI applications continue to expand and improve our daily lives.
    
    This mock transcript will be replaced with actual YouTube transcript fetching logic in a future update.`,
  };

  // Return the mock transcript for the videoId or the default one
  return mockTranscripts[videoId] || mockTranscripts.default;
}