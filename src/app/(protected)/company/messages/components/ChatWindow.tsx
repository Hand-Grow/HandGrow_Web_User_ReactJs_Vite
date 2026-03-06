import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';

export default function ChatWindow() {
  return (
    <div className="flex-1 bg-white rounded-2xl border border-neutral-200 shadow-sm flex flex-col overflow-hidden">
      <ChatHeader />

      {/* messages */}
      <div className="flex-1 bg-neutral-50 p-6 space-y-5 overflow-y-auto">
        <MessageBubble text="Chào anh! Em là đại diện HTX..." time="09:15" />
        <MessageBubble mine text="Có, cần 50 tấn ST25." time="09:18" />
        <MessageBubble text="9,000đ/kg. VietGAP." time="09:20" />
        <MessageBubble mine text="Khi nào giao hàng?" time="09:25" />
      </div>

      <ChatInput />
    </div>
  );
}
