import toast from 'react-hot-toast';
import React from 'react';
import { InfoIcon, AlertTriangleIcon } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  message: string;
  duration?: number;
}

export const showToast = (
  type: ToastType,
  { message, duration = 3000 }: ToastOptions
) => {
  switch (type) {
    case 'success':
      toast.success(message, { duration });
      break;

    case 'error':
      toast.error(message, { duration });
      break;

    case 'info':
      toast(message, {
        duration,
        icon: React.createElement(InfoIcon, { size: 20 }),
      });
      break;

    case 'warning':
      toast(message, {
        duration,
        icon: React.createElement(AlertTriangleIcon, { size: 20 }),
      });
      break;

    default:
      toast(message);
  }
};
