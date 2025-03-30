import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  isLoading = false,
}: ButtonProps) {
  const baseClasses = 'rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800';
  
  const variantClasses = {
    primary: 'bg-kinexity-primary text-white hover:bg-kinexity-secondary focus:ring-kinexity-primary dark:bg-kinexity-dark-primary dark:hover:bg-kinexity-dark-secondary dark:focus:ring-kinexity-dark-primary',
    secondary: 'bg-kinexity-accent text-kinexity-text hover:bg-amber-500 focus:ring-kinexity-accent dark:bg-kinexity-dark-accent dark:text-kinexity-dark-text dark:hover:bg-amber-600 dark:focus:ring-kinexity-dark-accent',
    outline: 'bg-transparent border border-kinexity-primary text-kinexity-primary hover:bg-kinexity-primary/10 focus:ring-kinexity-primary dark:border-kinexity-dark-primary dark:text-kinexity-dark-primary dark:hover:bg-kinexity-dark-primary/10 dark:focus:ring-kinexity-dark-primary',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const disabledClasses = disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className} inline-flex items-center justify-center`}
    >
      {isLoading && (
        <LoadingSpinner 
          size={size === 'lg' ? 'md' : 'sm'} 
          className="mr-2"
        />
      )}
      {children}
    </button>
  );
} 