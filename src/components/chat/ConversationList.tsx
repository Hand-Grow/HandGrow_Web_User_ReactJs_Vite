import { Search } from 'lucide-react';
import ConversationItem from './ConversationItem';
import { ChatRoom } from '@/src/types';

interface Props {
  rooms: ChatRoom[];
  selectedRoomId: string | null;
  viewerType: 'ENTERPRISE' | 'COOPERATIVE';
  onSelectRoom: (roomId: string) => void;
}

export default function ConversationList({
  rooms,
  selectedRoomId,
  viewerType,
  onSelectRoom,
}: Props) {
  return (
    <div className="w-90 bg-white rounded-2xl border border-neutral-200 shadow-sm flex flex-col overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center bg-neutral-50 rounded-xl px-3 py-2">
          <Search size={16} className="text-neutral-400" />
          <input
            placeholder="Tìm kiếm tin nhắn..."
            className="ml-2 w-full bg-transparent outline-none text-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {rooms.map((room) => (
          <ConversationItem
            key={room.id}
            room={room}
            active={room.id === selectedRoomId}
            viewerType={viewerType}
            onClick={() => onSelectRoom(room.id)}
          />
        ))}
        {rooms.length === 0 && (
          <div className="p-8 text-center text-sm text-neutral-500">
            Chưa có đoạn chat nào.
          </div>
        )}
      </div>
    </div>
  );
}
