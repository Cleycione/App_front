import React from 'react';

interface PrivacyToggleProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function PrivacyToggle({ 
  id, 
  label, 
  description, 
  checked, 
  onChange 
}: PrivacyToggleProps) {
  return (
    <div className="flex items-start justify-between gap-3 py-3">
      <div className="flex-1">
        <label htmlFor={id} className="text-sm font-medium text-[var(--petmatch-text)] cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-xs text-[var(--petmatch-text-muted)] mt-1">
            {description}
          </p>
        )}
      </div>
      
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--petmatch-primary)] focus:ring-offset-2 ${
          checked ? 'bg-[var(--petmatch-primary)]' : 'bg-gray-200'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
