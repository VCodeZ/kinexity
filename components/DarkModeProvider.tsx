'use client';

import React from 'react';
import DarkModeToggle from './DarkModeToggle';

interface DarkModeProviderProps {
  children: React.ReactNode;
}

export default function DarkModeProvider({ children }: DarkModeProviderProps) {
  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <DarkModeToggle />
      </div>
      {children}
    </>
  );
} 