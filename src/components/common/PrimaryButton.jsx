import React from 'react';

const PrimaryButton = ({
  type = 'button',
  loading = false,
  loadingText = 'Đang xử lý...',
  disabled = false,
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        w-full
        h-10
        bg-teal-500 hover:bg-teal-600
        text-white font-semibold
        py-2 px-4 rounded-lg
        transition duration-200
        disabled:opacity-70
        ${className}
      `}
      {...props}
    >
      {loading ? loadingText : children}
    </button>
  );
};

export default PrimaryButton;
