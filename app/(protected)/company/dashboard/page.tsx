'use client';

import ActivitySection from '../components/ActivitySection';
import MetricsRow from '../components/MetricsRow';
import ProductSection from '../components/ProductSection';
import QuickActions from '../components/QuickActions';

export default function CompanyDashboard() {
  return (
    <div className="font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <h1 className="text-3xl font-black text-gray-950 tracking-tight">
              Hệ thống Quản trị Doanh nghiệp
            </h1>
            <p className="text-gray-500 font-medium mt-1 text-sm">
              Giám sát chuỗi cung ứng và nguồn hàng thời gian thực
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-gray-50 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-gray-600">Live Data</span>
          </div>
        </div>

        <MetricsRow />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6">
            <ProductSection />
          </div>

          <div className="flex flex-col gap-6">
            <ActivitySection />
            <QuickActions />

            <div className="p-5 bg-gradient-to-br from-emerald-600 to-emerald-400 rounded-2xl text-white shadow-md shadow-emerald-100">
              <h4 className="font-bold text-xs uppercase tracking-wider">
                Mẹo vận hành
              </h4>
              <p className="text-[11px] mt-1.5 opacity-90 leading-normal font-medium">
                Kiểm tra hợp đồng sắp đến hạn để tối ưu vận chuyển.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
