/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'kinexity-primary': '#3B82F6',
        'kinexity-secondary': '#1E40AF',
        'kinexity-accent': '#FBBF24',
        'kinexity-background': '#F9FAFB',
        'kinexity-text': '#1F2937',
        // Dark mode variants
        'kinexity-dark-primary': '#60A5FA',
        'kinexity-dark-secondary': '#3B82F6',
        'kinexity-dark-accent': '#F59E0B',
        'kinexity-dark-background': '#111827',
        'kinexity-dark-text': '#F9FAFB',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-montserrat)', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 