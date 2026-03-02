import { Phone, Video, MoreVertical } from 'lucide-react';

export default function ChatHeader() {
  return (
    <div className="flex items-center justify-between p-4 border border-neutral-200 shadow-sm bg-white">
      <div className="flex items-center gap-3">
        <img
          src="https://picsum.photos/40"
          className="w-10 h-10 rounded-full"
        />

        <div>
          <p className="font-semibold text-sm">HTX Nông nghiệp An Phước</p>
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
