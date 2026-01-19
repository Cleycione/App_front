import React from 'react';
import { useHighContrastStyles } from '@/app/hooks/useHighContrastStyles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const { highContrast } = useHighContrastStyles();
  
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const contrastBorder = highContrast ? 'border-2 font-semibold' : '';
  
  const variants = {
    primary: `bg-[var(--petmatch-primary)] text-white hover:bg-blue-600 active:scale-[0.98] ${highContrast ? 'border-blue-900 shadow-md' : 'shadow-sm'}`,
    secondary: `bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-[0.98] ${highContrast ? 'border-gray-700' : 'border border-gray-300'}`,
    danger: `bg-red-500 text-white hover:bg-red-600 active:scale-[0.98] ${highContrast ? 'border-red-900 shadow-md' : 'shadow-sm'}`,
    outline: `border-2 border-[var(--petmatch-primary)] text-[var(--petmatch-primary)] hover:bg-blue-50 active:scale-[0.98] ${highContrast ? 'font-semibold' : ''}`,
    ghost: `text-gray-700 hover:bg-gray-100 active:scale-[0.98] ${highContrast ? 'border-gray-400' : ''}`,
  };
  
  const sizes = {
    sm: 'px-4 py-2 min-h-[40px]',
    md: 'px-6 py-3 min-h-[48px]',
    lg: 'px-8 py-4 min-h-[56px]',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${contrastBorder} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}