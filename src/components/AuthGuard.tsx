'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/auth/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, initializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Đang khởi tạo (đọc token) → chờ, không làm gì cả
    if (initializing) return;

    // Đọc xong, không có user → đá ra login
    if (!user) {
      router.replace('/login');
    }
  }, [initializing, user, router]);

  // Đang tải → hiển thị màn hình chờ, không redirect vội
  if (initializing) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontSize: '1rem',
          color: '#555',
        }}
      >
        Đang tải dữ liệu HandGrow...
      </div>
    );
  }

  // Đọc xong và đã đăng nhập → render nội dung
  return user ? <>{children}</> : null;
}
