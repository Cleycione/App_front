import React from 'react';

interface PatinhaCoinProps {
  count: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function PatinhaCoin({ count, size = 'md', showLabel = true }: PatinhaCoinProps) {
  const sizes = {
    sm: { icon: 16, text: 'text-sm' },
    md: { icon: 24, text: 'text-base' },
    lg: { icon: 32, text: 'text-xl' },
  };

  const currentSize = sizes[size];

  return (
    <div className="inline-flex items-center gap-2">
      <div className="relative">
        <div 
          className="rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md"
          style={{ width: currentSize.icon, height: currentSize.icon }}
        >
          <span className="text-white" style={{ fontSize: currentSize.icon * 0.6 }}>
            🐾
          </span>
        </div>
      </div>
      <span className={`font-semibold text-[var(--app-gray-900)] ${currentSize.text}`}>
        {count}
        {showLabel && <span className="ml-1 text-[var(--app-gray-600)]">
          Patinha{count !== 1 ? 's' : ''}
        </span>}
      </span>
    </div>
  );
}
