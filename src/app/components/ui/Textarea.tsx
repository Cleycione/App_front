import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    const baseStyles = 'w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-white resize-none';
    const stateStyles = error
      ? 'border-[var(--app-danger)] focus:border-[var(--app-danger)] focus:ring-2 focus:ring-[var(--app-danger)]/20'
      : 'border-[var(--app-gray-300)] focus:border-[var(--app-primary)] focus:ring-2 focus:ring-[var(--app-primary)]/20';
    const disabledStyles = props.disabled ? 'bg-[var(--app-gray-100)] cursor-not-allowed' : '';

    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-[var(--app-gray-700)]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`${baseStyles} ${stateStyles} ${disabledStyles} ${className} outline-none`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-[var(--app-danger)]">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-[var(--app-gray-500)]">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
