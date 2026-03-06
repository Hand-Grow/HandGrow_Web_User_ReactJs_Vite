'use client';

import { authService } from '@/services/authService';
import { userService } from '@/services/userService';
import { UserProfile } from '@/types/users';
import {
  LogOut,
  FileText,
  Clock,
  Bell,
  Lock,
  Mail,
  Phone,
  MapPin,
  Loader2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function ProfileContent() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userService.getProfile();
        setUser(data);
      } catch (error) {
        console.error('Lỗi lấy profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    authService.logout();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-green-600" />
      </div>
    );
  }

  const getInitial = (name?: string) => {
    return name ? name.charAt(0).toUpperCase() : 'H';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cá nhân</h1>
        <p className="text-gray-600 mt-1">
          Quản lý thông tin cá nhân và cài đặt
        </p>
      </div>

      <div className="bg-white rounded-lg p-8 border shadow-sm">
        <div className="flex items-start gap-6 mb-6">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-4xl font-bold">
              {getInitial(user?.fullName)}
            </div>
          )}

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {user?.fullName || 'Đang tải...'}
            </h2>

            <p className="text-emerald-600 font-medium mb-4">
              {user?.role === 'COOP' ? 'Hợp tác xã' : 'Doanh nghiệp'}
            </p>

            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> {user?.username}
              </p>

              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {user?.phoneNumber || 'Chưa cập nhật'}
              </p>

              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {user?.address ? `${user.address}, ` : ''}
                {user?.commune ? `${user.commune}, ` : ''}
                {user?.province || 'Chưa cập nhật'}
              </p>
            </div>
          </div>

          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            Chỉnh sửa
          </button>
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Sản phẩm chính"
          value={user?.produce || 'N/A'}
          color="green"
        />
        <StatCard label="Đơn hàng" value="--" color="blue" />
        <StatCard label="Trạng thái" value="Hoạt động" color="orange" />
      </div>

      <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
        <div className="p-6 border-b bg-gray-50">
          <h3 className="font-semibold text-gray-900">Tiện ích</h3>
        </div>

        <div className="divide-y">
          <MenuButton icon={<FileText />} label="Quản lý hợp đồng" />
          <MenuButton icon={<Clock />} label="Lịch sử giao dịch" />
          <MenuButton icon={<Bell />} label="Cài đặt thông báo" />
          <MenuButton icon={<Lock />} label="Cài đặt bảo mật" />
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-100 rounded-lg p-4 flex items-center justify-center"
      >
        <LogOut className="w-5 h-5" />
        Đăng xuất tài khoản
      </button>
    </div>
  );
}

function MenuButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="w-full flex items-center gap-4 p-5 hover:bg-gray-50 text-left group">
      <span className="text-gray-400 group-hover:text-green-600">{icon}</span>
      <p className="font-medium text-gray-900 flex-1">{label}</p>
      <span className="text-gray-400 group-hover:translate-x-1 transition">
        ›
      </span>
    </button>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-lg p-6 border shadow-sm">
      <p className="text-gray-500 text-sm font-medium">{label}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
