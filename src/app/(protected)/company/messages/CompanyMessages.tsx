import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';
import { chatApi } from '../../../../services/chat/chatApi';
import { ChatRoom } from '../../../../services/chat/types';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

export default function CompanyMessages() {
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
            viewerType="ENTERPRISE"
            onSelectRoom={setSelectedRoomId}
          />
          <ChatWindow selectedRoom={selectedRoom} senderType="ENTERPRISE" />
        </>
      )}
    </div>
  );
}
