import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const uniqueId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full flex flex-col font-sans mb-6">
        {label && (
          <label
            htmlFor={uniqueId}
            className="text-xs uppercase tracking-editorial text-text-secondary font-semibold mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={uniqueId}
          className={`w-full bg-transparent border-b border-border-subtle py-3 px-1 text-sm text-text-dark placeholder-text-muted transition-colors focus:outline-none focus:border-text-dark disabled:opacity-50 disabled:cursor-not-allowed ${
            error ? 'border-red-500 focus:border-red-500' : ''
          } ${className}`}
          {...props}
        />
        {error && (
          <span className="text-[11px] text-red-500 mt-1 tracking-wide">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span className="text-[11px] text-text-muted mt-1 tracking-wide">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
