import React from 'react';

type ButtonVariant = 'default' | 'ghost';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  variant?: ButtonVariant;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  type = 'button',
  loading = false,
  loadingText = 'Đang xử lý...',
  disabled = false,
  variant = 'default',
  children,
  className = '',
  ...props
}) => {
  const baseStyle = `
    w-full
    h-10
    font-semibold
    py-2 px-4 rounded-lg
    transition duration-200
    disabled:opacity-70
  `;

  const variantStyle =
    variant === 'ghost'
      ? 'bg-transparent hover:bg-gray-100 text-gray-900'
      : 'bg-teal-500 hover:bg-teal-600 text-white';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseStyle} ${variantStyle} ${className}`}
      {...props}
    >
      {loading ? loadingText : children}
    </button>
  );
};

export default PrimaryButton;
