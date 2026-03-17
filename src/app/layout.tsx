import './globals.css';
import { ReactNode } from 'react';
import AppProviders from '@/src/components/providers/AppProviders';
import { I18nProvider } from './I18nProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <I18nProvider>
          <AppProviders>{children}</AppProviders>
        </I18nProvider>
      </body>
    </html>
  );
}
