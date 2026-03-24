import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import ConversationItem from './ConversationItem';
import { ChatRoom } from '@/src/types';
import { UserRole } from '@/src/constants';

interface Props {
  rooms: ChatRoom[];
  selectedRoomId: string | null;
  viewerType: UserRole;
  onSelectRoom: (roomId: string) => void;

  collapsed?: boolean;
  onToggle?: () => void;
}

export default function ConversationList({
  rooms,
  selectedRoomId,
  viewerType,
  onSelectRoom,
  collapsed = false,
  onToggle,
}: Props) {
  return (
    <div
      className={`
    transition-all duration-300
    bg-neutral-50
    flex flex-col
    overflow-hidden
    h-full

    ${collapsed ? 'w-[64px]' : 'w-full sm:w-80 lg:w-96'}
  `}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-3 sm:p-4">
        {!collapsed && (
          <h2 className="text-sm font-semibold text-neutral-700">Tin nhắn</h2>
        )}

        {onToggle && (
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-neutral-100 transition"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        )}
      </div>

      {/* SEARCH */}
      {!collapsed && (
        <div className="px-3 sm:px-4 pb-3">
          <div className="flex items-center bg-neutral-100 rounded-xl px-3 py-2">
            <Search size={16} className="text-neutral-400" />
            <input
              placeholder="Tìm kiếm tin nhắn..."
              className="ml-2 w-full bg-transparent outline-none text-sm placeholder-neutral-400"
            />
          </div>
        </div>
      )}

      {/* LIST */}
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

        {rooms.length === 0 && !collapsed && (
          <div className="p-6 sm:p-8 text-center text-sm text-neutral-500">
            Chưa có đoạn chat nào.
          </div>
        )}
      </div>
    </div>
  );
}
