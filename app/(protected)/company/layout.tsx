'use client';

import { Header } from '@/src/components/layout/Header';
import Sidebar from '@/app/(protected)/company/components/Sidebar';
import AuthGuard from '@/src/components/AuthGuard';
import React, { useState, useEffect } from 'react';

interface SidebarChangeEvent extends CustomEvent {
  detail: {
    expanded: boolean;
  };
}

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  useEffect(() => {
    const handleSidebarChange = (e: Event) => {
      const customEvent = e as SidebarChangeEvent;
      setSidebarExpanded(customEvent.detail.expanded);
    };

    window.addEventListener('sidebarChange', handleSidebarChange);
    return () =>
      window.removeEventListener('sidebarChange', handleSidebarChange);
  }, []);

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex flex-1">
          <Sidebar onExpandChange={setSidebarExpanded} />
          <main
            className={`flex-1 overflow-x-auto transition-all duration-300 ${
              sidebarExpanded ? 'ml-64' : 'ml-20'
            }`}
          >
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
