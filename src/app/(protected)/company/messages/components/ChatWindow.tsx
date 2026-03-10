import { useCallback, useEffect, useState, useRef } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';
import { ChatRoom, ChatMessage } from '../../../../../services/chat/types';
import { chatApi } from '../../../../../services/chat/chatApi';

interface Props {
  selectedRoom: ChatRoom | undefined;
  senderType: 'ENTERPRISE' | 'COOPERATIVE';
}

export default function ChatWindow({ selectedRoom, senderType }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const jwtPayload = useRef<{ role?: string; id?: string }>({}); // To determine who "mine" is

  useEffect(() => {
    // hacky way to get current user type if needed from local storage JWT
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        jwtPayload.current = { role: payload.role, id: payload.sub };
      }
    } catch (error) {
      console.error('Failed to parse token', error);
    }
  }, []);

  const fetchMessages = useCallback(async () => {
    if (!selectedRoom) return;
    try {
      const res = await chatApi.getMessages(selectedRoom.id, 0, 100);
      setMessages(res.data);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  }, [selectedRoom]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Poll every 3 seconds for now
    return () => clearInterval(interval);
  }, [fetchMessages]);

  const handleSendMessage = async (text: string) => {
    if (!selectedRoom || !text.trim()) return;
    try {
      await chatApi.sendMessage(selectedRoom.id, text, senderType);
      fetchMessages();
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  if (!selectedRoom) {
    return (
      <div className="flex-1 bg-white rounded-2xl border border-neutral-200 shadow-sm flex items-center justify-center">
        <p className="text-neutral-500">Chọn một cuộc hội thoại để bắt đầu</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white rounded-2xl border border-neutral-200 shadow-sm flex flex-col overflow-hidden">
      <ChatHeader room={selectedRoom} viewerType={senderType} />

      {/* messages */}
      <div className="flex-1 bg-neutral-50 p-6 space-y-5 overflow-y-auto">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            text={msg.content}
            time={new Date(msg.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
            mine={msg.senderType === senderType}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSendMessage} />
    </div>
  );
}
