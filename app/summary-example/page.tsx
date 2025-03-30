'use client';

import React from 'react';
import SummaryDisplay from '../../components/SummaryDisplay';

export default function SummaryExamplePage() {
  // Sample summary data
  const sampleSummary = {
    tldr: "The video discusses productivity techniques, time management strategies, and mental models for effective decision making.",
    bullets: [
      "The Pomodoro Technique involves working in focused 25-minute intervals with 5-minute breaks",
      "Time blocking helps allocate specific times for different tasks throughout the day",
      "The Eisenhower Matrix categorizes tasks by urgency and importance",
      "Deep work requires eliminating distractions and focusing on complex tasks",
      "Building keystone habits can lead to compound improvements in productivity"
    ],
    paragraph: "This comprehensive guide to productivity explores various techniques and mental models that can help improve focus, time management, and decision making. The video begins by explaining the Pomodoro Technique, which breaks work into manageable intervals. It then discusses time blocking as a method to schedule specific activities and prevent multitasking. The Eisenhower Matrix is presented as a framework for prioritizing tasks based on their urgency and importance. The concept of deep work is explored as a way to tackle complex problems that require sustained concentration. Finally, the video explains how building keystone habits can create positive cascading effects across multiple areas of life, leading to compound improvements in productivity and wellbeing over time."
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold text-kinexity-primary mb-6 text-center">
        Video Summary Example
      </h1>
      
      <SummaryDisplay summary={sampleSummary} />
    </div>
  );
} 