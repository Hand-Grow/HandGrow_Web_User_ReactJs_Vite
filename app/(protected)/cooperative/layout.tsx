'use client';

import { Header } from '@/src/components/layout/Header';
import { Sidebar } from '@/src/components/sidebar';
import AuthGuard from '@/src/components/AuthGuard';
import React, { useState, useEffect } from 'react';
interface SidebarChangeEvent extends CustomEvent {
  detail: {
    expanded: boolean;
  };
}

export default function CooperativeLayout({
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
      <div className="min-h-screen bg-neutral-50">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header />
        </div>

        <div className="flex">
          <div className="fixed top-16 left-0 bottom-0 z-40">
            <Sidebar onExpandChange={setSidebarExpanded} />
          </div>
          <main
            className={`
            flex-1 transition-all duration-300
            pt-16
            ${sidebarExpanded ? 'ml-64' : 'ml-20'}
          `}
          >
            <div className="p-6">{children}</div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
