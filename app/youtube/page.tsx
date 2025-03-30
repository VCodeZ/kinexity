'use client';

import React, { useState } from 'react';
import YouTubeInput from '../../components/YouTubeInput';

export default function YouTubePage() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (id: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store the video ID
    setVideoId(id);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold text-kinexity-primary mb-6 text-center">
        YouTube Video Summarizer
      </h1>
      
      <YouTubeInput 
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
      
      {videoId && (
        <div className="mt-8 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-medium mb-4">Video Details</h2>
          <p className="mb-2">
            <span className="font-medium">Video ID:</span> {videoId}
          </p>
          <div className="mt-4 aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
} 