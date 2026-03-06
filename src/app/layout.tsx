import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/context/theme/ThemeContext';
import { AuthProvider } from '@/context/auth/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider
          // eslint-disable-next-line no-undef
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <AuthProvider>
            <ThemeProvider>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="light"
              />
              {children}
            </ThemeProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
