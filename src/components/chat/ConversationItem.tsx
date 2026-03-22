import { UserRole } from '@/src/constants';
import { PRODUCE_LABELS, ProduceType } from '@/src/constants/produce';
import { ChatRoom } from '@/src/types';

interface Props {
  room: ChatRoom;
  active?: boolean;
  viewerType: UserRole;
  onClick: () => void;
}

export default function ConversationItem({
  room,
  active,
  viewerType,
  onClick,
}: Props) {
  const displayName =
    viewerType === 'ENTERPRISE'
      ? room.cooperativeName
      : room.enterpriseName || 'Doanh nghiệp';

  const productLabel =
    PRODUCE_LABELS[room.productName as ProduceType] ?? room.productName;

  const avatarUrl =
    viewerType === 'ENTERPRISE'
      ? room.cooperativeAvatarUrl
      : room.enterpriseAvatarUrl;

  const defaultAvatar =
    'https://api.dicebear.com/7.x/avataaars/svg?seed=' + displayName;

  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-neutral-100 transition
        ${active ? 'bg-emerald-50' : 'hover:bg-neutral-50'}
      `}
    >
      {/* avatar */}
      <div className="relative">
        <img
          src={avatarUrl || defaultAvatar}
          alt={displayName}
          className="w-11 h-11 rounded-full object-cover border border-neutral-100"
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultAvatar;
          }}
        />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{displayName}</p>
        <p className="text-xs text-neutral-500 truncate">
          Về: {room.productName ? productLabel : 'Không rõ'}
        </p>
      </div>

      <div className="flex flex-col items-end gap-1">
        <span className="text-xs text-neutral-400 min-w-max">
          {new Date(room.updatedAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
