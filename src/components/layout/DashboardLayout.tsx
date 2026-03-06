'use client';

import { ReactNode } from 'react';
import { Sidebar } from '../sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="ml-64 flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
