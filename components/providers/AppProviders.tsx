/* global process */
'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/context/theme/ThemeContext';
import { AuthProvider } from '@/context/auth/AuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

interface Props {
  children: ReactNode;
}

export default function AppProviders({ children }: Props) {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}
    >
      <AuthProvider>
        <ThemeProvider>
          {children}

          <ToastContainer position="top-right" autoClose={3000} theme="light" />
        </ThemeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
