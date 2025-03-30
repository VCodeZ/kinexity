'use client';

import React, { useState } from 'react';
import YouTubeInput from '../../components/YouTubeInput';
import SummaryDisplay from '../../components/SummaryDisplay';

type SummaryData = {
  tldr: string;
  bullets: string[];
  paragraph: string;
};

export default function SummarizePage() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'input' | 'transcript' | 'summary'>('input');

  const fetchTranscript = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
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
      setStep('transcript');
      
      // Automatically proceed to summarization
      await summarizeTranscript(data.transcript);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setStep('input');
    } finally {
      setIsLoading(false);
    }
  };

  const summarizeTranscript = async (transcriptText: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript: transcriptText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to summarize transcript');
      }

      const data = await response.json();
      setSummary(data.summary);
      setStep('summary');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleYouTubeSubmit = async (id: string) => {
    setVideoId(id);
    await fetchTranscript(id);
  };

  const resetProcess = () => {
    setStep('input');
    setTranscript(null);
    setSummary(null);
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold text-kinexity-primary mb-6 text-center">
        Kinexity - Watch Less, Know More
      </h1>
      
      {step === 'input' && (
        <div>
          <p className="text-center mb-6 text-kinexity-text">
            Enter a YouTube video URL to get a quick summary.
          </p>
          <YouTubeInput 
            handleSubmit={handleYouTubeSubmit}
            isLoading={isLoading}
          />
        </div>
      )}
      
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={resetProcess}
            className="mt-2 text-kinexity-primary hover:underline focus:outline-none"
          >
            Try again
          </button>
        </div>
      )}
      
      {step === 'transcript' && transcript && !summary && (
        <div className="mt-8">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Transcript</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => summarizeTranscript(transcript)}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-md bg-kinexity-primary text-white hover:bg-kinexity-secondary focus:outline-none ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Processing...' : 'Summarize'}
                </button>
                <button 
                  onClick={resetProcess}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none"
                >
                  Start Over
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">Video ID: {videoId}</p>
            <div className="prose max-w-none h-60 overflow-y-auto">
              {transcript.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {step === 'summary' && summary && (
        <div className="mt-8">
          <div className="flex justify-end mb-4">
            <button 
              onClick={resetProcess}
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none"
            >
              Summarize Another Video
            </button>
          </div>
          
          {videoId && (
            <div className="mb-6 aspect-video">
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
          )}
          
          <SummaryDisplay summary={summary} />
        </div>
      )}
    </div>
  );
} 