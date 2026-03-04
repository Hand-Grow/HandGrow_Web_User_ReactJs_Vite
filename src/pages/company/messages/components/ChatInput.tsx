import { Send, Paperclip, Smile } from 'lucide-react';

export default function ChatInput() {
  return (
    <div className="border-t border-neutral-200 bg-white p-4 space-y-3">
      {/* input */}
      <div className="flex items-center gap-3 bg-neutral-100 rounded-xl px-4 py-2">
        <Paperclip size={18} className="text-neutral-400" />

        <input
          placeholder="Nhập tin nhắn..."
          className="flex-1 bg-transparent outline-none text-sm"
        />

        <Smile size={18} className="text-neutral-400" />

        <button className="bg-emerald-600 text-white p-2 rounded-lg">
          <Send size={14} />
        </button>
      </div>

      {/* actions */}
      <div className="flex gap-3 text-xs">
        <button className="border border-neutral-200 shadow-sm px-3 py-1.5 rounded-lg">
          📄 Tạo hợp đồng
        </button>
        <button className="border border-neutral-200 shadow-sm px-3 py-1.5 rounded-lg">
          💰 Báo giá
        </button>
        <button className="border border-neutral-200 shadow-sm px-3 py-1.5 rounded-lg">
          📦 Yêu cầu mẫu
        </button>
      </div>
    </div>
  );
}
