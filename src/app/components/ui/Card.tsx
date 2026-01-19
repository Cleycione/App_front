import React from 'react';
import { useHighContrastStyles } from '@/app/hooks/useHighContrastStyles';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  const { highContrast } = useHighContrastStyles();
  
  const baseStyles = 'bg-white rounded-2xl overflow-hidden';
  const shadowStyles = highContrast ? 'shadow-none border-2 border-[var(--app-gray-900)]' : 'shadow-md border border-[var(--app-gray-200)]';
  const clickableStyles = onClick ? 'cursor-pointer hover:shadow-lg transition-all duration-200' : '';

  return (
    <div className={`${baseStyles} ${shadowStyles} ${clickableStyles} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}