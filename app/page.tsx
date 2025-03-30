import React from "react";
import Link from "next/link";
import Image from "next/image";
import DarkModeToggle from "../components/DarkModeToggle";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <header className="w-full py-4 px-6 md:px-8 flex justify-between items-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10">
        <div className="flex items-center">
          <h2 className="text-2xl font-heading font-bold text-kinexity-primary dark:text-kinexity-dark-primary">
            Kinexity
          </h2>
        </div>
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex space-x-6 font-medium">
            <Link href="/youtube" className="text-gray-700 hover:text-kinexity-primary dark:text-gray-300 dark:hover:text-kinexity-dark-primary transition">
              YouTube
            </Link>
            <Link href="/summarize" className="text-gray-700 hover:text-kinexity-primary dark:text-gray-300 dark:hover:text-kinexity-dark-primary transition">
              Summarize
            </Link>
          </nav>
          <DarkModeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 text-center md:text-left space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-kinexity-primary dark:text-kinexity-dark-primary leading-tight">
                Watch Less,<br />
                <span className="text-kinexity-secondary dark:text-kinexity-dark-secondary">Know More</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-lg">
                Get concise summaries of YouTube videos instantly. Save time while gaining all the essential knowledge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <Link href="/youtube" className="px-8 py-3 bg-kinexity-primary hover:bg-kinexity-secondary text-white font-medium rounded-lg transition shadow-md hover:shadow-lg dark:bg-kinexity-dark-primary dark:hover:bg-kinexity-dark-secondary">
                  Summarize a Video
                </Link>
                <Link href="/summarize" className="px-8 py-3 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-kinexity-primary dark:text-kinexity-dark-primary font-medium rounded-lg border border-gray-200 dark:border-gray-700 transition shadow-sm hover:shadow-md">
                  Try a Demo
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-kinexity-primary/10 to-kinexity-accent/10 dark:from-kinexity-dark-primary/20 dark:to-kinexity-dark-accent/20 rounded-2xl shadow-xl flex items-center justify-center">
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-kinexity-primary/10 dark:bg-kinexity-dark-primary/20 rounded-2xl transform rotate-12"></div>
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-kinexity-accent/10 dark:bg-kinexity-dark-accent/20 rounded-2xl transform -rotate-12"></div>
                <div className="relative z-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg w-3/4 h-2/3 flex flex-col">
                  <div className="h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
                  <div className="h-2 w-5/6 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
                  <div className="h-2 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full mb-6"></div>
                  <div className="flex-grow flex flex-col justify-center space-y-2">
                    <div className="h-2 w-full bg-kinexity-primary/30 dark:bg-kinexity-dark-primary/30 rounded-full"></div>
                    <div className="h-2 w-5/6 bg-kinexity-primary/30 dark:bg-kinexity-dark-primary/30 rounded-full"></div>
                    <div className="h-2 w-3/4 bg-kinexity-primary/30 dark:bg-kinexity-dark-primary/30 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="max-w-screen-xl w-full mt-24 md:mt-36">
          <h2 className="text-2xl md:text-3xl font-bold text-center font-heading mb-12">
            Why Choose <span className="text-kinexity-primary dark:text-kinexity-dark-primary">Kinexity</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-kinexity-primary/10 dark:bg-kinexity-dark-primary/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-kinexity-primary dark:text-kinexity-dark-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Save Time</h3>
              <p className="text-gray-600 dark:text-gray-400">Get the key points from videos without watching the entire content.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-kinexity-primary/10 dark:bg-kinexity-dark-primary/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-kinexity-primary dark:text-kinexity-dark-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Insights</h3>
              <p className="text-gray-600 dark:text-gray-400">Our AI extracts the most valuable information from any video.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-kinexity-primary/10 dark:bg-kinexity-dark-primary/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-kinexity-primary dark:text-kinexity-dark-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Export</h3>
              <p className="text-gray-600 dark:text-gray-400">Download summaries as PDF or Markdown for your convenience.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-6 px-6 md:px-8">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Kinexity. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-kinexity-primary dark:text-gray-400 dark:hover:text-kinexity-dark-primary">
              Terms
            </a>
            <a href="#" className="text-gray-500 hover:text-kinexity-primary dark:text-gray-400 dark:hover:text-kinexity-dark-primary">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
