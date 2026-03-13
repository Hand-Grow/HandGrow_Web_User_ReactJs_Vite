'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';

import { ChatMessage, ChatRoom, DraftContractData } from '@/src/types';
import { contractAPI } from '@/services/contract/aiContractService';
import ContractFormModal from './components/ContractModal';
import { chatApi } from '@/services/chat/chatApi';

interface Props {
  selectedRoom: ChatRoom | undefined;
  senderType: 'ENTERPRISE' | 'COOPERATIVE';
}

export default function ChatWindow({ selectedRoom, senderType }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isDrafting, setIsDrafting] = useState(false);
  const [draftData, setDraftData] = useState<DraftContractData | null>(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleDraftContract = async () => {
    if (!selectedRoom) return;

    try {
      setIsDrafting(true);

      const res = await contractAPI.aiDraftContract(selectedRoom.id);

      setDraftData(res.data);
      setShowModal(true);
    } catch (err) {
      console.error('Draft contract failed', err);
    } finally {
      setIsDrafting(false);
    }
  };

  if (!selectedRoom) {
    return (
      <div className="flex-1 bg-white rounded-2xl border border-neutral-200 flex items-center justify-center">
        <p className="text-neutral-500"> Chọn một cuộc hội thoại để bắt đầu </p>
      </div>
    );
  }
  const handleSendContract = async () => {
    if (!selectedRoom?.id) return;

    try {
      const res = await contractAPI.getContractByRoom(selectedRoom.id);

      const contract = res.data;

      await chatApi.sendMessage(
        selectedRoom.id,
        JSON.stringify({
          type: 'CONTRACT',
          contractId: contract.id,
        }),
        senderType
      );

      fetchMessages();
    } catch (error) {
      console.error('Send contract failed', error);
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

      {isDrafting && (
        <div className="text-xs text-neutral-500 px-4 py-2">
          🤖 AI đang đọc cuộc thương lượng...
        </div>
      )}

      <ChatInput
        onSend={handleSendMessage}
        onCreateContract={handleDraftContract}
        onSendContract={handleSendContract}
      />

      {draftData && (
        <ContractFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          draft={draftData}
          onSaved={async () => {
            await handleSendContract();
            fetchMessages();
          }}
        />
      )}
    </div>
  );
}
