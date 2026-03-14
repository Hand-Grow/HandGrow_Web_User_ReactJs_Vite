'use client';

import * as React from 'react';
import clsx from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          'w-full h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm',
          'focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
