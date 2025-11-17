import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant: 'success' | 'danger' | 'warning' | 'neutral';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant, className = '' }) => {
  const baseClasses = 'px-2.5 py-1 text-xs font-semibold rounded-full inline-block';
  const variants = {
    success: 'bg-green-500/20 text-green-300',
    danger: 'bg-red-500/20 text-red-300',
    warning: 'bg-yellow-500/20 text-yellow-300',
    neutral: 'bg-gray-500/20 text-gray-300',
  };

  return <span className={`${baseClasses} ${variants[variant]} ${className}`}>{children}</span>;
};

export default Badge;
