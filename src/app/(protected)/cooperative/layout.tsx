import { Sidebar } from '@/src/components/sidebar';
import React from 'react';

export default function CooperativeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 ml-64 transition-all">
        <div className="p-6 w-full">{children}</div>
      </main>
    </div>
  );
}
