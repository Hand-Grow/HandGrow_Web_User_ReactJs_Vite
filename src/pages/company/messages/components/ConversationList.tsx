import { Search } from 'lucide-react';
import ConversationItem from './ConversationItem';

export default function ConversationList() {
  const mock = Array(6).fill(0);

  return (
    <div className="w-[360px] bg-white rounded-2xl border border-neutral-200 shadow-sm shadow-sm flex flex-col overflow-hidden">
      {/* search */}
      <div className="p-4 border-b">
        <div className="flex items-center bg-neutral-50 rounded-xl px-3 py-2">
          <Search size={16} className="text-neutral-400" />
          <input
            placeholder="Tìm kiếm tin nhắn..."
            className="ml-2 w-full bg-transparent outline-none text-sm"
          />
        </div>
      </div>

      {/* list */}
      <div className="flex-1 overflow-y-auto">
        {mock.map((_, i) => (
          <ConversationItem key={i} active={i === 0} unread={i === 0 ? 2 : 0} />
        ))}
      </div>
    </div>
  );
}
