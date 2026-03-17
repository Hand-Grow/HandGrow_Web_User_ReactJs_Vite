// Trong MessagesPage.tsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { chatApi } from '@/src/services/chat/chatApi';
import { ChatRoom } from '@/src/types';
import ConversationList from '@/src/components/chat/ConversationList';
import ChatWindow from '@/src/components/chat/ChatWindow';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { useAuth } from '@/src/context/auth/useAuth'; // Import useAuth
import { USER_ROLES } from '@/src/constants';

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const roomIdFromUrl = searchParams.get('roomId');
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(
    roomIdFromUrl
  );
  const [loading, setLoading] = useState(true);

  // Lấy user từ context thay vì fetch riêng
  const { user } = useAuth();

  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      const res = await chatApi.getMyRooms();
      setRooms(res.data);
      toast.success(t('CHAT.LOAD_SUCCESS') || 'Tải danh sách chat thành công!');

      if (!roomIdFromUrl && res.data.length > 0) {
        setSelectedRoomId(res.data[0].id);
      }
    } catch (_) {
      toast.error(t('CHAT.LOAD_ERROR') || 'Không thể tải danh sách chat!');
    } finally {
      setLoading(false);
    }
  }, [roomIdFromUrl, t]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);

  // ✅ QUAN TRỌNG: Xác định senderType dựa trên role của user
  const getSenderType = () => {
    if (!user) return 'COOPERATIVE'; // Default

    // Nếu user là COOP -> gửi với senderType = 'COOPERATIVE'
    if (user.role === USER_ROLES.COOP) {
      return 'COOPERATIVE';
    }
    // Nếu user là ENTERPRISE -> gửi với senderType = 'ENTERPRISE'
    if (user.role === USER_ROLES.ENTERPRISE) {
      return 'ENTERPRISE';
    }

    return 'COOPERATIVE';
  };

  return (
    <div className="h-[calc(100vh-80px)] flex gap-6">
      {loading ? (
        <div className="flex-1 flex items-center justify-center bg-white rounded-2xl border border-neutral-200">
          <Loader2 className="animate-spin text-emerald-600" size={32} />
        </div>
      ) : (
        <>
          <ConversationList
            rooms={rooms}
            selectedRoomId={selectedRoomId}
            viewerType="COOP"
            onSelectRoom={setSelectedRoomId}
            collapsed={collapsed}
            onToggle={() => setCollapsed(!collapsed)}
          />
          <ChatWindow
            selectedRoom={selectedRoom}
            senderType={getSenderType()}
          />
        </>
      )}
    </div>
  );
}
