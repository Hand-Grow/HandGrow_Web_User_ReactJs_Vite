'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import ConversationList from '../../company/messages/components/ConversationList';
import ChatWindow from '../../company/messages/components/ChatWindow';
import { chatApi } from '../../../../services/chat/chatApi';
import { ChatRoom } from '../../../../services/chat/types';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const roomIdFromUrl = searchParams.get('roomId');

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

      if (
        roomIdFromUrl &&
        !res.data.find((r: ChatRoom) => r.id === roomIdFromUrl)
      ) {
        // The room might not be fully fetched yet, but ideally it should be in the list
      } else if (!roomIdFromUrl && res.data.length > 0) {
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
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tin nhắn</h1>
          <p className="text-gray-600 mt-1">Quản lý tin nhắn từ các đối tác</p>
        </div>

        <div className="h-[calc(100vh-200px)] flex gap-6">
          {loading ? (
            <div className="flex-1 flex items-center justify-center bg-white rounded-2xl border border-neutral-200">
              <Loader2 className="animate-spin text-green-600" size={32} />
            </div>
          ) : (
            <>
              <ConversationList
                rooms={rooms}
                selectedRoomId={selectedRoomId}
                viewerType="COOPERATIVE"
                onSelectRoom={setSelectedRoomId}
              />
              <ChatWindow
                selectedRoom={selectedRoom}
                senderType="COOPERATIVE"
              />
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
