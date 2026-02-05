'use client';

import { LogOut, FileText, Clock, Bell, Lock } from 'lucide-react';
import MainLayout from '../main-layout';

function ProfileContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cá nhân</h1>
        <p className="text-gray-600 mt-1">
          Quản lý thông tin cá nhân và cài đặt
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg p-8 border">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-24 h-24 rounded-full bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-4xl">
            H
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              HTX Nông nghiệp An Phước
            </h2>
            <p className="text-gray-600 mb-4">Quản lý HTX nông nghiệp</p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📧 admin@htxanphuoc.vn</p>
              <p>📱 0901 234 567</p>
              <p>📍 An Phước, Tây Phú</p>
            </div>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            Chỉnh sửa
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 border">
          <p className="text-gray-600 text-sm">Thành viên</p>
          <p className="text-3xl font-bold text-green-600 mt-2">125</p>
        </div>
        <div className="bg-white rounded-lg p-6 border">
          <p className="text-gray-600 text-sm">Đơn hàng</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">45</p>
        </div>
        <div className="bg-white rounded-lg p-6 border">
          <p className="text-gray-600 text-sm">Chờ duyệt</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">8</p>
        </div>
      </div>

      {/* Management Menu */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-semibold text-gray-900">Quản lý</h3>
        </div>
        <div className="divide-y">
          <button className="w-full flex items-center gap-4 p-6 hover:bg-gray-50 transition text-left group">
            <FileText className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Quản lý hợp đồng</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>
          <button className="w-full flex items-center gap-4 p-6 hover:bg-gray-50 transition text-left group">
            <Clock className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Lịch sử giao dịch</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>
          <button className="w-full flex items-center gap-4 p-6 hover:bg-gray-50 transition text-left group">
            <Bell className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Cài đặt thông báo</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>
          <button className="w-full flex items-center gap-4 p-6 hover:bg-gray-50 transition text-left group">
            <Lock className="w-5 h-5 text-gray-600 group-hover:text-green-600" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Cài đặt bảo mật</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        </div>
      </div>

      {/* Logout */}
      <button className="w-full gap-2 text-red-600 hover:text-red-700 border-red-200 bg-transparent p-6 flex items-center justify-center">
        <LogOut className="w-5 h-5" />
        Đăng xuất
      </button>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <MainLayout>
      <ProfileContent />
    </MainLayout>
  );
}
