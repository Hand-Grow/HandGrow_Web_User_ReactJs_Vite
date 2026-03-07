import './globals.css';
import { ReactNode } from 'react';
import AppProviders from '@/components/providers/AppProviders';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <AppProviders> {children} </AppProviders>
      </body>
    </html>
  );
}
