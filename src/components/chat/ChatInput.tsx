import { Send, Paperclip, Smile } from 'lucide-react';
import { useState } from 'react';

interface Props {
  onSend: (text: string) => void;
  onCreateContract: () => void;
}

export default function ChatInput({ onSend, onCreateContract }: Props) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };
  return (
    <div className="border-t border-neutral-200 bg-white p-4 space-y-3">
      {/* input */}
      <div className="flex items-center gap-3 bg-neutral-100 rounded-xl px-4 py-2">
        <Paperclip size={18} className="text-neutral-400" />

        <input
          placeholder="Nhập tin nhắn..."
          className="flex-1 bg-transparent outline-none text-sm"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />

        <Smile size={18} className="text-neutral-400 cursor-pointer" />

        <button
          onClick={handleSend}
          className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition"
        >
          <Send size={14} />
        </button>
      </div>

      {/* actions */}
      <div className="flex gap-3 text-xs">
        <button
          onClick={onCreateContract}
          className="border border-neutral-200 shadow-sm px-3 py-1.5 rounded-lg"
        >
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
