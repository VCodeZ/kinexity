/**
 * Utility functions for working with YouTube
 */

/**
 * Extracts YouTube video ID from various YouTube URL formats
 * @param url YouTube URL to extract video ID from
 * @returns Video ID if found, null otherwise
 */
export function extractYouTubeVideoId(url: string): string | null {
  // Handle various YouTube URL formats:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://youtube.com/shorts/VIDEO_ID
  // - https://www.youtube.com/embed/VIDEO_ID
  // - https://www.youtube.com/v/VIDEO_ID
  
  const regexPatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&?\/]+)/,
    /(?:youtube\.com\/embed\/|youtube\.com\/v\/)([^&?\/]+)/,
    /(?:^|\/|v=)([a-zA-Z0-9_-]{11})(?:\s|$|&|\/)/  // Match any 11-character video ID
  ];

  // Get a clean URL to work with
  const trimmedUrl = url.trim();
  
  for (const pattern of regexPatterns) {
    const match = trimmedUrl.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
} 