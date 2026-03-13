import { ChatRoom } from '@/src/types';
import { Phone, Video, MoreVertical } from 'lucide-react';

interface Props {
  room: ChatRoom;
  viewerType: 'ENTERPRISE' | 'COOPERATIVE';
}

export default function ChatHeader({ room, viewerType }: Props) {
  const displayName =
    viewerType === 'ENTERPRISE' ? room.cooperativeName : room.enterpriseName;
  return (
    <div className="flex items-center justify-between p-4 border border-neutral-200 shadow-sm bg-white">
      <div className="flex items-center gap-3">
        <img
          src="https://picsum.photos/40"
          className="w-10 h-10 rounded-full"
        />

        <div>
          <p className="font-semibold text-sm">{displayName}</p>
          <p className="text-xs text-green-600">Đang hoạt động</p>
        </div>
      </div>

      <div className="flex gap-4 text-neutral-500">
        <Phone size={18} />
        <Video size={18} />
        <MoreVertical size={18} />
      </div>
    </div>
  );
}
