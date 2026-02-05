'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 z-50" />
    <DialogPrimitive.Content
      ref={ref}
      className={clsx(
        'fixed z-50 left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
        'bg-white rounded-lg shadow-lg p-6',
        className
      )}
      {...props}
    />
  </DialogPrimitive.Portal>
));
DialogContent.displayName = 'DialogContent';

export const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('mb-4', className)} {...props} />
);

export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={clsx('text-lg font-semibold', className)}
    {...props}
  />
));
DialogTitle.displayName = 'DialogTitle';
export const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx('mt-4 flex justify-end space-x-2', className)}
    {...props}
  />
);
