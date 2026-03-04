import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

export default function CompanyLayout() {
  return (
    <div className="flex bg-neutral-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 flex flex-col">
          <div className="w-full px-8 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
