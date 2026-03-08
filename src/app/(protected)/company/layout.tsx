import React from 'react';
import Sidebar from '@/components/layout/company/Sidebar';

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        <div className="p-6 w-full">{children}</div>
      </main>
    </div>
  );
}
