'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
import { chatApi } from '@/src/services/chat/chatApi';
import { ChatRoom } from '@/src/types';
import ConversationList from '@/src/components/chat/ConversationList';
import ChatWindow from '@/src/components/chat/ChatWindow';

// 1. TÁCH LÕI LOGIC ra một component riêng
function MessagesContent() {
  const searchParams = useSearchParams();
  const roomIdFromUrl = searchParams.get('roomId');
  const [collapsed, setCollapsed] = useState(false);

  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(
    roomIdFromUrl
  );
  const [loading, setLoading] = useState(true);

  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      const res = await chatApi.getMyRooms();
      setRooms(res.data);

      if (!roomIdFromUrl && res.data.length > 0) {
        setSelectedRoomId(res.data[0].id);
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách phòng chat:', error);
      toast.error('Không thể tải danh sách phòng chat');
    } finally {
      setLoading(false);
    }
  }, [roomIdFromUrl]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);

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
            viewerType="COOPERATIVE"
            onSelectRoom={setSelectedRoomId}
            collapsed={collapsed}
            onToggle={() => setCollapsed(!collapsed)}
          />
          <ChatWindow selectedRoom={selectedRoom} senderType="COOPERATIVE" />
        </>
      )}
    </div>
  );
}

// 2. LỚP VỎ BẢO VỆ: Export component chính đã được bọc Suspense
export default function MessagesPage() {
  return (
    <Suspense
      fallback={
        <div className="h-[calc(100vh-80px)] flex items-center justify-center bg-white rounded-2xl border border-neutral-200">
          <Loader2 className="animate-spin text-emerald-600" size={32} />
        </div>
      }
    >
      <MessagesContent />
    </Suspense>
  );
}
