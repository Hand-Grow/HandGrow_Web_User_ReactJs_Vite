'use client';

import * as React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center rounded-lg font-medium transition disabled:opacity-60 disabled:cursor-not-allowed',
          variant === 'default' && 'bg-teal-600 text-white hover:bg-teal-700',
          variant === 'outline' &&
            'border border-gray-300 bg-white hover:bg-gray-100',
          variant === 'ghost' && 'hover:bg-accent hover:text-accent-foreground',
          size === 'default' && 'h-10 px-4 text-sm',
          size === 'sm' && 'h-8 px-3 text-xs',
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
