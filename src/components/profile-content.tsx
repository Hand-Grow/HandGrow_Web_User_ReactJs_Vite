'use client';

import { authService } from '@/src/services/authService';
import { userService } from '@/src/services/userService';
import {
  Camera,
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
import React, { useEffect, useState, useRef } from 'react';
import { UserProfile, UpdateProfileRequest } from '../types';
import i18next from 'i18next';
import { toast } from 'react-hot-toast';
import { fileService } from '@/src/services/fileService';

export default function ProfileContent() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateProfileRequest>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const fetchProfile = async () => {
    try {
      const data = await userService.getProfile();
      setUser(data);
      setFormData({
        fullName: data.fullName,
        companyName: data.fullName,
        phoneNumber: data.phoneNumber,
        address: data.address,
        commune: data.commune,
        province: data.province,
        representativeName: data.representativeName,
        avatarUrl: data.avatarUrl,
      });
    } catch (error) {
      console.error('Lỗi lấy profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    authService.logout();
    router.push(`/login?lang=${i18next.language}`);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const toastId = toast.loading('Đang tải ảnh lên...');
    try {
      const publicUrl = await fileService.uploadFile(file);
      setFormData({ ...formData, avatarUrl: publicUrl });
      toast.success('Tải ảnh thành công!', { id: toastId });
    } catch (error) {
      console.error('Lỗi upload avatar:', error);
      toast.error('Không thể tải ảnh lên.', { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updateData = { ...formData };
      if (user?.role === 'COOP' || user?.role === 'ENTERPRISE') {
        updateData.companyName = formData.fullName;
      }

      await userService.updateProfile(updateData);
      toast.success('Cập nhật hồ sơ thành công!');
      setIsEditing(false);
      await fetchProfile();
    } catch (error) {
      console.error('Lỗi cập nhật profile:', error);
      toast.error('Có lỗi xảy ra khi lưu.');
    } finally {
      setIsSaving(false);
    }
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

  const isCoop = user?.role === 'COOP';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight font-outfit">
            Hồ sơ cá nhân
          </h1>
          <p className="text-gray-500 mt-1 font-medium">
            {isCoop
              ? 'Quản lý thông tin Hợp tác xã của bạn'
              : 'Quản lý thông tin Doanh nghiệp của bạn'}
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg hover:shadow-emerald-200 active:scale-95"
          >
            Chỉnh sửa hồ sơ
          </button>
        )}
      </div>

      <div
        className={`rounded-3xl p-8 border shadow-sm relative overflow-hidden transition-all duration-500 ${isCoop ? 'bg-white border-green-100' : 'bg-white border-blue-50'}`}
      >
        <div
          className={`absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32 opacity-10 transition-colors ${isCoop ? 'bg-green-500' : 'bg-blue-500'}`}
        ></div>

        {isEditing ? (
          <div className="relative flex flex-col md:flex-row gap-10">
            <div className="flex flex-col items-center gap-4">
              <div
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className="relative group cursor-pointer"
              >
                <div className="w-40 h-40 rounded-3xl overflow-hidden border-4 border-emerald-50 shadow-xl transition-all group-hover:brightness-75 group-hover:scale-105">
                  {formData.avatarUrl ? (
                    <img
                      src={formData.avatarUrl}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-6xl font-bold">
                      {getInitial(formData.fullName)}
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
                {isUploading && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-3xl">
                    <Loader2 className="w-10 h-10 animate-spin text-white" />
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                className="hidden"
                accept="image/*"
              />
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Nhấn để đổi ảnh
              </p>
            </div>

            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormInput
                  label={isCoop ? 'Tên Hợp tác xã' : 'Tên Doanh nghiệp'}
                  value={formData.fullName}
                  onChange={(val) =>
                    setFormData({ ...formData, fullName: val })
                  }
                />
                <FormInput
                  label="Số điện thoại"
                  value={formData.phoneNumber || ''}
                  onChange={(val) =>
                    setFormData({ ...formData, phoneNumber: val })
                  }
                />
                <FormInput
                  label="Người đại diện"
                  value={formData.representativeName || ''}
                  onChange={(val) =>
                    setFormData({ ...formData, representativeName: val })
                  }
                />
                <FormInput
                  label="Tỉnh / Thành phố"
                  value={formData.province || ''}
                  onChange={(val) =>
                    setFormData({ ...formData, province: val })
                  }
                />
                <FormInput
                  label="Địa chỉ chi tiết"
                  value={formData.address || ''}
                  onChange={(val) => setFormData({ ...formData, address: val })}
                  fullWidth
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={handleSave}
                  disabled={isSaving || isUploading}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-emerald-100 transition-all active:scale-95"
                >
                  {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                  Lưu hồ sơ
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95"
                >
                  Hủy bỏ
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 relative">
            <div className="relative">
              <div
                className={`w-40 h-40 rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl transition-transform hover:scale-105 duration-500 ${isCoop ? 'rotate-3' : '-rotate-3'}`}
              >
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-full h-full flex items-center justify-center text-white text-6xl font-black ${isCoop ? 'bg-linear-to-br from-green-400 to-green-600' : 'bg-linear-to-br from-blue-400 to-blue-600'}`}
                  >
                    {getInitial(user?.fullName)}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-3xl shadow-xl flex items-center justify-center border-4 border-gray-50">
                <div
                  className={`w-4 h-4 rounded-full animate-pulse ${isCoop ? 'bg-green-500' : 'bg-blue-500'}`}
                ></div>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left pt-4">
              <div className="mb-2">
                <span
                  className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm mb-4 ${isCoop ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}
                >
                  {user?.role === 'COOP' ? 'Hợp tác xã' : 'Doanh nghiệp'}
                </span>
              </div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none mb-3 font-outfit">
                {user?.fullName || 'Đang tải...'}
              </h2>

              <p className="text-gray-400 text-sm font-medium mb-8">
                Hệ sinh thái nông nghiệp bền vững HandGrow • ID:{' '}
                {user?.id?.slice(0, 8)}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 max-w-2xl">
                <InfoItem
                  icon={<Mail />}
                  label="Tài khoản"
                  value={user?.username}
                  color={isCoop ? 'green' : 'blue'}
                />
                <InfoItem
                  icon={<Phone />}
                  label="Liên hệ"
                  value={user?.phoneNumber}
                  color={isCoop ? 'green' : 'blue'}
                />
                <InfoItem
                  icon={<MapPin />}
                  label="Trụ sở"
                  color={isCoop ? 'green' : 'blue'}
                  value={
                    user?.address || user?.province
                      ? `${user?.address ? user.address + ', ' : ''}${user?.province || ''}`
                      : null
                  }
                />
                <InfoItem
                  icon={<FileText />}
                  label="Người đại diện"
                  value={user?.representativeName}
                  color={isCoop ? 'green' : 'blue'}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Nông sản chính"
          value={user?.produce || 'Đa dạng'}
          icon={<FileText className="w-6 h-6 text-emerald-600" />}
          bgColor="bg-emerald-50/50"
        />
        <StatCard
          label="Thành viên"
          value={isCoop ? '45+' : '--'}
          icon={<Clock className="w-6 h-6 text-blue-600" />}
          bgColor="bg-blue-50/50"
        />
        <StatCard
          label="Đánh giá"
          value="4.9 ★"
          icon={<Bell className="w-6 h-6 text-orange-600" />}
          bgColor="bg-orange-50/50"
        />
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-black text-gray-900 flex items-center gap-3 text-lg uppercase tracking-wider">
            <div className="w-3 h-8 bg-emerald-500 rounded-2xl"></div>
            Công cụ quản lý
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-50">
          <MenuButton icon={<FileText />} label="Hợp đồng" color="emerald" />
          <MenuButton icon={<Clock />} label="Giao dịch" color="blue" />
          <MenuButton icon={<Bell />} label="Thông báo" color="orange" />
          <MenuButton icon={<Lock />} label="Bảo mật" color="gray" />
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full group gap-4 text-red-500 hover:text-red-700 hover:bg-red-50/50 border border-red-50 rounded-[2rem] p-6 flex items-center justify-center transition-all active:scale-95 shadow-sm hover:shadow-red-100"
      >
        <LogOut className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        <span className="font-black uppercase tracking-[0.3em] text-[10px]">
          Đăng xuất tài khoản an toàn
        </span>
      </button>
    </div>
  );
}

function FormInput({
  label,
  value,
  onChange,
  fullWidth = false,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  fullWidth?: boolean;
}) {
  return (
    <div className={`space-y-2 ${fullWidth ? 'md:col-span-2' : ''}`}>
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-gray-50/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-gray-700"
        placeholder={`Nhập ${label.toLowerCase()}...`}
      />
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
  color = 'emerald',
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
  color?: string;
}) {
  const colorMap: Record<string, string> = {
    green: 'bg-green-50 text-green-500',
    blue: 'bg-blue-50 text-blue-500',
    emerald: 'bg-emerald-50 text-emerald-500',
  };

  return (
    <div className="flex items-start gap-4 group">
      <div
        className={`p-2.5 rounded-2xl transition-all duration-300 shadow-sm ${colorMap[color] || colorMap.emerald}`}
      >
        {React.cloneElement(
          icon as React.ReactElement<{ className?: string }>,
          { className: 'w-5 h-5' }
        )}
      </div>
      <div>
        <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1">
          {label}
        </p>
        <p className="text-gray-800 font-bold leading-tight">
          {value || 'Chưa cập nhật'}
        </p>
      </div>
    </div>
  );
}

function MenuButton({
  icon,
  label,
  color = 'emerald',
}: {
  icon: React.ReactNode;
  label: string;
  color?: string;
}) {
  const colorMap: Record<string, string> = {
    emerald: 'group-hover:text-emerald-600 group-hover:bg-emerald-50',
    blue: 'group-hover:text-blue-600 group-hover:bg-blue-50',
    orange: 'group-hover:text-orange-600 group-hover:bg-orange-50',
    gray: 'group-hover:text-gray-600 group-hover:bg-gray-50',
  };

  return (
    <button className="w-full flex flex-col items-center gap-4 p-8 hover:bg-gray-50/50 text-center transition-all relative group">
      <div
        className={`p-4 bg-gray-50 rounded-[1.5rem] text-gray-400 transition-all duration-300 ${colorMap[color]}`}
      >
        {React.cloneElement(
          icon as React.ReactElement<{ className?: string }>,
          { className: 'w-6 h-6' }
        )}
      </div>
      <p className="font-black text-gray-900 uppercase tracking-widest text-[10px]">
        {label}
      </p>
    </button>
  );
}

function StatCard({
  label,
  value,
  icon,
  bgColor,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
}) {
  return (
    <div
      className={`rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden relative bg-white`}
    >
      <div className="absolute -right-4 -bottom-4 p-4 opacity-5 group-hover:opacity-10 transition-all duration-500 group-hover:scale-150 rotate-12">
        {React.cloneElement(
          icon as React.ReactElement<{ className?: string }>,
          { className: 'w-24 h-24' }
        )}
      </div>
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-inner ${bgColor}`}
      >
        {icon}
      </div>
      <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className="text-4xl font-black text-gray-900 tracking-tighter">
        {value}
      </p>
    </div>
  );
}
