'use client';

import React, { useRef, useState, useEffect } from 'react';
// Remove static import of html2pdf
// import html2pdf from 'html2pdf.js';

interface SummaryProps {
  summary: {
    tldr: string;
    bullets: string[];
    paragraph: string;
  };
}

export default function SummaryDisplay({ summary }: SummaryProps) {
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const summaryContentRef = useRef<HTMLDivElement>(null);

  // Convert summary to Markdown format
  const getMarkdownContent = () => {
    let markdown = '';
    
    // TL;DR section
    markdown += `# Summary\n\n`;
    markdown += `## TL;DR\n\n${summary.tldr}\n\n`;
    
    // Bullet points section
    markdown += `## Key Points\n\n`;
    summary.bullets.forEach(bullet => {
      markdown += `- ${bullet}\n`;
    });
    markdown += '\n';
    
    // Detailed paragraph section
    markdown += `## Detailed Summary\n\n${summary.paragraph}\n`;
    
    return markdown;
  };

  // Copy markdown to clipboard
  const copyToClipboard = async () => {
    const markdown = getMarkdownContent();
    
    try {
      await navigator.clipboard.writeText(markdown);
      setCopyFeedback('Copied to clipboard!');
      
      // Clear feedback after 2 seconds
      setTimeout(() => setCopyFeedback(null), 2000);
      
      // Also download the file
      downloadMarkdown();
    } catch {
      setCopyFeedback('Failed to copy. Try again.');
      setTimeout(() => setCopyFeedback(null), 2000);
    }
  };

  // Download as Markdown file
  const downloadMarkdown = () => {
    const markdown = getMarkdownContent();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'summary.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Export as PDF
  const exportToPDF = async () => {
    if (!summaryContentRef.current) return;
    
    try {
      // Dynamically import html2pdf only when needed
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default;
      
      // Set PDF options
      const options = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: 'summary.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as const }
      };

      // Create a clone of the content to modify for PDF
      const content = summaryContentRef.current.cloneNode(true) as HTMLElement;
      
      // Add a title at the top
      const titleDiv = document.createElement('div');
      titleDiv.innerHTML = `<h2 style="font-size: 24px; margin-bottom: 15px; text-align: center; color: #3B82F6;">Video Summary</h2>`;
      content.insertBefore(titleDiv, content.firstChild);
      
      // Generate the PDF
      html2pdf().set(options).from(content).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700/20 rounded-lg p-6 relative transition-colors duration-200">
      {/* Export buttons */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <div className="relative">
          <button 
            onClick={copyToClipboard}
            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white rounded-md flex items-center transition-colors"
            title="Copy to clipboard & download .md file"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
            Export as Markdown
          </button>
          {copyFeedback && (
            <span className="absolute -bottom-8 left-0 right-0 text-center text-sm bg-black text-white dark:bg-white dark:text-black p-1 rounded">
              {copyFeedback}
            </span>
          )}
        </div>
        <button 
          onClick={exportToPDF}
          className="px-3 py-1.5 text-sm bg-kinexity-primary hover:bg-kinexity-secondary dark:bg-kinexity-dark-primary dark:hover:bg-kinexity-dark-secondary text-white rounded-md flex items-center transition-colors"
          title="Download as PDF file"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          Download as PDF
        </button>
      </div>

      {/* Summary content */}
      <div className="mt-8 space-y-6" ref={summaryContentRef}>
        {/* TL;DR Section */}
        <div>
          <h3 className="text-xl font-heading font-bold text-kinexity-primary dark:text-kinexity-dark-primary mb-2">
            TL;DR
          </h3>
          <p className="text-kinexity-text dark:text-kinexity-dark-text">{summary.tldr}</p>
        </div>

        {/* Bullet Points Section */}
        <div>
          <h3 className="text-xl font-heading font-bold text-kinexity-primary dark:text-kinexity-dark-primary mb-2">
            Bullet Points
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {summary.bullets.map((bullet, index) => (
              <li key={index} className="text-kinexity-text dark:text-kinexity-dark-text">
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        {/* Detailed Summary Section */}
        <div>
          <h3 className="text-xl font-heading font-bold text-kinexity-primary dark:text-kinexity-dark-primary mb-2">
            Detailed Summary
          </h3>
          <p className="text-kinexity-text dark:text-kinexity-dark-text whitespace-pre-line">
            {summary.paragraph}
          </p>
        </div>
      </div>
    </div>
  );
} 