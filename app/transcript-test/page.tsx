'use client';

import React, { useState } from 'react';
import YouTubeInput from '../../components/YouTubeInput';

export default function TranscriptTestPage() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (id: string) => {
    setIsLoading(true);
    setError(null);
    setTranscript(null);
    
    try {
      const response = await fetch('/api/transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoId: id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch transcript');
      }

      const data = await response.json();
      setVideoId(id);
      setTranscript(data.transcript);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold text-kinexity-primary mb-6 text-center">
        YouTube Transcript Fetcher
      </h1>
      
      <YouTubeInput 
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
      
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}
      
      {transcript && (
        <div className="mt-8">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-medium mb-2">Transcript</h2>
            <p className="text-sm text-gray-500 mb-4">Video ID: {videoId}</p>
            <div className="prose max-w-none">
              {transcript.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 