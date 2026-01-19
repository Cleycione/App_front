import React from 'react';
import { Check, X } from 'lucide-react';

interface HealthChipProps {
  label: string;
  status: boolean;
  size?: 'sm' | 'md';
}

export function HealthChip({ label, status, size = 'md' }: HealthChipProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${
        sizeClasses[size]
      } ${
        status
          ? 'bg-green-100 text-green-700 border border-green-200'
          : 'bg-gray-100 text-gray-600 border border-gray-200'
      }`}
    >
      {status ? <Check size={size === 'sm' ? 12 : 14} /> : <X size={size === 'sm' ? 12 : 14} />}
      {label}
    </span>
  );
}
