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