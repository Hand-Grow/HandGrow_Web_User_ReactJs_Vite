import React from 'react';
import { ToastContainer } from 'react-toastify';

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <div lang="vi" className="font-sans antialiased bg-gray-50 min-h-screen">
      {children}
      <ToastContainer />
    </div>
  );
}
