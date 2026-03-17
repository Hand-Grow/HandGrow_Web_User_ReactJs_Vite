import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from '../Header';

interface CompanyLayoutProps {
  children: ReactNode;
}

export default function CompanyLayout({ children }: CompanyLayoutProps) {
  return (
    <div className="flex bg-neutral-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 flex flex-col">
          <div className="w-full px-8 py-6"> {children} </div>
        </main>
      </div>
    </div>
  );
}
