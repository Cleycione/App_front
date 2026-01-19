import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className = '', ...props }, ref) => {
    const baseStyles = 'w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-white';
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
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--app-gray-400)]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`${baseStyles} ${stateStyles} ${disabledStyles} ${icon ? 'pl-12' : ''} ${className} outline-none`}
            {...props}
          />
        </div>
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

Input.displayName = 'Input';
