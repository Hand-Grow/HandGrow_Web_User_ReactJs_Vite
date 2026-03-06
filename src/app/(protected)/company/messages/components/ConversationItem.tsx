interface Props {
  active?: boolean;
  unread?: number;
}

export default function ConversationItem({ active, unread }: Props) {
  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 cursor-pointer border border-neutral-200 shadow-sm transition
        ${active ? 'bg-emerald-50' : 'hover:bg-neutral-50'}
      `}
    >
      {/* avatar */}
      <div className="relative">
        <img
          src="https://picsum.photos/40"
          className="w-11 h-11 rounded-full object-cover"
        />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold">HTX Nông nghiệp An Phước</p>
        <p className="text-xs text-neutral-500 truncate">
          Vâng, chúng tôi có thể giao hàng vào...
        </p>
      </div>

      <div className="flex flex-col items-end gap-1">
        <span className="text-xs text-neutral-400">10:30</span>

        {unread ? (
          <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full">
            {unread}
          </span>
        ) : null}
      </div>
    </div>
  );
}
