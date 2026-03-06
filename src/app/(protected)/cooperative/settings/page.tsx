'use client';

import MainLayout from '@/components/layout/MainLayout';
export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cài đặt</h1>
          <p className="text-gray-600 mt-1">Quản lý cài đặt hệ thống</p>
        </div>
        <div className="bg-white p-12 rounded-xl border border-gray-200 text-center">
          <p className="text-gray-500">Tính năng này đang phát triển</p>
        </div>
      </div>
    </MainLayout>
  );
}
