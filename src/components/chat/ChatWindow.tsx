import { useCallback, useEffect, useState, useRef } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';
import { AIContractSuggestion, ChatMessage, ChatRoom } from '@/src/types';
import { chatApi } from '@/src/services/chat/chatApi';
import { aiContractService } from '@/src/services/ai/aiContractService';
import ContractModal from './components/ContractModal';
interface Props {
  selectedRoom: ChatRoom | undefined;
  senderType: 'ENTERPRISE' | 'COOPERATIVE';
}

export default function ChatWindow({ selectedRoom, senderType }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [contractOpen, setContractOpen] = useState(false);
  const [aiContract, setAiContract] = useState<
    AIContractSuggestion | undefined
  >(undefined);
  const [loadingAI, setLoadingAI] = useState(false);
  const fetchMessages = useCallback(async () => {
    if (!selectedRoom?.id) return;

    try {
      const res = await chatApi.getMessages(selectedRoom.id, 0, 100);
      setMessages(res.data);
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  }, [selectedRoom?.id]);

  useEffect(() => {
    setMessages([]);
  }, [selectedRoom?.id]);

  useEffect(() => {
    if (!selectedRoom?.id) return;

    fetchMessages();

    const interval = setInterval(fetchMessages, 3000);

    return () => clearInterval(interval);
  }, [fetchMessages, selectedRoom?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
      <div className="flex-1 bg-white rounded-2xl border border-neutral-200 flex items-center justify-center">
        <p className="text-neutral-500">Chọn một cuộc hội thoại để bắt đầu</p>
      </div>
    );
  }
  const generateContractFromAI = async () => {
    if (!selectedRoom) return;

    try {
      setLoadingAI(true);

      const messagesText = messages.map((m) => m.content);

      const res = await aiContractService.extractContract({
        roomId: selectedRoom.id,
        messages: messagesText,
      });

      setAiContract(res.data);
      setContractOpen(true);
    } catch (error) {
      console.error('AI extraction failed', error);
    } finally {
      setLoadingAI(false);
    }
  };
  return (
    <div className="flex-1 bg-white rounded-2xl border border-neutral-200 flex flex-col overflow-hidden">
      <ChatHeader room={selectedRoom} viewerType={senderType} />

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
      {loadingAI && (
        <div className="text-xs text-neutral-500 px-4 py-2">
          🤖 AI đang phân tích cuộc thương lượng...
        </div>
      )}
      <ChatInput
        onSend={handleSendMessage}
        onCreateContract={generateContractFromAI}
      />
      <ContractModal
        open={contractOpen}
        onClose={() => setContractOpen(false)}
        aiData={aiContract}
      />
    </div>
  );
}
