import React, { useState } from 'react';
import Button from './Button';
import { extractYouTubeVideoId } from '../lib/youtube-utils';

interface YouTubeInputProps {
  handleSubmit: (videoId: string) => void;
  isLoading?: boolean;
}

export default function YouTubeInput({ handleSubmit, isLoading = false }: YouTubeInputProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Trim whitespace
    const trimmedUrl = url.trim();
    
    if (!trimmedUrl) {
      setError('Please enter a YouTube URL');
      return;
    }

    const videoId = extractYouTubeVideoId(trimmedUrl);
    
    if (!videoId) {
      setError('Invalid YouTube URL. Please enter a valid YouTube video link.');
      return;
    }

    // Call the submit handler with the video ID
    handleSubmit(videoId);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={onSubmit} className="bg-white shadow-md rounded-lg p-6 mb-4">
        <div className="mb-4">
          <label 
            htmlFor="youtube-url" 
            className="block text-kinexity-text font-medium mb-2"
          >
            YouTube Video URL
          </label>
          <input
            id="youtube-url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-kinexity-primary focus:border-transparent"
            disabled={isLoading}
          />
          {error && (
            <p className="mt-2 text-red-600 text-sm">{error}</p>
          )}
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
          >
            Summarize
          </Button>
        </div>
      </form>
    </div>
  );
} 