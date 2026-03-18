'use client';

import { JoinRequestStatus } from '@/src/types/joinRequest';
import { X } from 'lucide-react';
import { useEffect } from 'react';

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: JoinRequestStatus;
  joinDate: string;
  loans: number;
  totalDebt: number;
  landArea: number;
  cropType: string;
}

interface MemberDetailModalProps {
  member: Member;
  onClose: () => void;
}

const statusConfig = {
  active: { label: 'Hoạt động', color: 'bg-emerald-100 text-emerald-700' },
  pending: { label: 'Chờ duyệt', color: 'bg-orange-100 text-orange-700' },
  inactive: { label: 'Ngừng hoạt động', color: 'bg-red-100 text-red-700' },
};

export function MemberDetailModal({ member, onClose }: MemberDetailModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <>
      \{' '}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40 animate-in fade-in"
      />
      \{' '}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto z-50 animate-in zoom-in-95">
        \{' '}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Chi tiết thành viên
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-2xl">
              {member.name[0]}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${statusConfig[member.status.toLowerCase() as keyof typeof statusConfig].color}`}
              >
                {
                  statusConfig[
                    member.status.toLowerCase() as keyof typeof statusConfig
                  ].label
                }
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              Thông tin liên hệ
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <div className="text-sm text-gray-700">{member.email}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </span>
                <div className="text-sm text-gray-700">{member.phone}</div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 flex items-start justify-center pt-0.5">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                <div className="text-sm text-gray-700">{member.address}</div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs font-medium text-gray-500">
                  Ngày tham gia:
                </span>
                <span className="text-sm text-gray-700">{member.joinDate}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              Thông tin tài chính
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-xs font-medium text-gray-600">Khoản nợ</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {member.loans}
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-xs font-medium text-gray-600">Tiền nợ</p>
                <p className="text-lg font-bold text-red-600 mt-1">
                  {(member.totalDebt / 1000000).toFixed(1)}M đ
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              Thông tin canh tác
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Diện tích đất</span>
                <span className="font-semibold text-gray-900">
                  {member.landArea} ha
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Loại cây trồng</span>
                <span className="font-semibold text-gray-900">
                  {member.cropType}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            Đóng
          </button>
          <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-medium">
            Chỉnh sửa
          </button>
        </div>
      </div>
    </>
  );
}
