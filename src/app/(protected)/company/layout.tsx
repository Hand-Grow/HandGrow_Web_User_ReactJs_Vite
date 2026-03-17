'use client';

import Sidebar from '@/src/app/(protected)/company/components/Sidebar';
import { Header } from '@/src/components/layout/Header';
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div
        className="grid flex-1"
        style={{
          gridTemplateColumns: sidebarExpanded ? '16rem 1fr' : '5rem 1fr',
        }}
      >
        <Sidebar onExpandChange={setSidebarExpanded} />
        <main className="p-6 overflow-x-auto"> {children} </main>
      </div>
    </div>
  );
}
