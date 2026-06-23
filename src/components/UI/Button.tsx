import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  accentColor?: string; // hex representation if variant is 'accent'
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  accentColor,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center font-sans tracking-editorial transition-all duration-300 focus:outline-none select-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeStyles = {
    sm: "px-4 py-2 text-xs uppercase font-semibold",
    md: "px-6 py-3.5 text-sm uppercase font-semibold",
    lg: "px-8 py-4.5 text-base uppercase font-semibold"
  };

  const variantStyles = {
    primary: "bg-text-dark text-white hover:bg-black border border-transparent",
    secondary: "bg-bg-subtle text-text-dark hover:bg-border-light border border-transparent",
    outline: "bg-transparent border border-text-dark text-text-dark hover:bg-text-dark hover:text-white",
    text: "bg-transparent text-text-dark hover:text-text-muted p-0 border-b border-transparent hover:border-text-muted",
    accent: "" // Handled dynamically below
  };

  const dynamicStyle = variant === 'accent' && accentColor
    ? {
        backgroundColor: accentColor,
        color: '#FFFFFF',
        border: `1px solid transparent`
      }
    : {};

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.01 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.99 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      style={dynamicStyle}
      disabled={disabled || loading}
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...(props as any)}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      {children}
    </motion.button>
  );
};
export default Button;
