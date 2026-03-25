// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import AppProviders from '@/src/components/providers/AppProviders';
import { I18nProvider } from './I18nProvider';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Hand Grow Together – Đối tác kinh doanh & doanh số',
  description:
    'Cùng phát triển và lớn mạnh với Hand Grow Together. Chọn vai trò đối tác kinh doanh hoặc đối tác doanh số để bắt đầu.',
  metadataBase: new URL('https://handgrow.id.vn'),
  openGraph: {
    title: 'Hand Grow Together',
    description: 'Cùng phát triển và lớn mạnh',
    url: 'https://handgrow.id.vn',
    siteName: 'Hand Grow Together',
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <I18nProvider>
          <Toaster position="top-right" />
          <AppProviders>{children}</AppProviders>
        </I18nProvider>
      </body>
    </html>
  );
}
