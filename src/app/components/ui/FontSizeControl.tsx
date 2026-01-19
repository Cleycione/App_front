import React from 'react';

type FontSize = 'small' | 'medium' | 'large' | 'extra-large';

interface FontSizeControlProps {
  value: FontSize;
  onChange: (size: FontSize) => void;
}

export function FontSizeControl({ value, onChange }: FontSizeControlProps) {
  const sizes: { value: FontSize; label: string }[] = [
    { value: 'small', label: 'Pequeno' },
    { value: 'medium', label: 'Padrão' },
    { value: 'large', label: 'Grande' },
    { value: 'extra-large', label: 'Extra grande' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {sizes.map((size) => (
          <button
            key={size.value}
            onClick={() => onChange(size.value)}
            className={`py-3 px-4 rounded-xl border-2 transition-all ${
              value === size.value
                ? 'border-[var(--app-primary)] bg-[var(--app-primary-light)] text-[var(--app-primary)]'
                : 'border-[var(--app-gray-300)] text-[var(--app-gray-700)] hover:border-[var(--app-gray-400)]'
            }`}
          >
            <span className="block font-medium">{size.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
