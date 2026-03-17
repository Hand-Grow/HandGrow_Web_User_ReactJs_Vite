'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';
import {
  ChatMessage,
  ChatRoom,
  DraftContractData,
  UserProfile,
} from '@/src/types';
import { contractAPI } from '@/src/services/contract/aiContractService';
import ContractFormModal from './components/ContractModal';
import { chatApi } from '@/src/services/chat/chatApi';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { authService } from '@/src/services/authService';
import { AxiosError } from 'axios';

interface Props {
  selectedRoom: ChatRoom | undefined;
  senderType: 'COOPERATIVE' | 'ENTERPRISE'; // ✅ SỬA: từ 'COOP' thành 'COOPERATIVE'
}

export default function ChatWindow({ selectedRoom, senderType }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const [isDrafting, setIsDrafting] = useState(false);
  const [draftData, setDraftData] = useState<DraftContractData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await authService.getProfile();
      setUser(profile);
    };
    fetchUserProfile();
  }, []);

  const fetchMessages = useCallback(async () => {
    if (!selectedRoom?.id) return;
    try {
      const res = await chatApi.getMessages(selectedRoom.id, 0, 100);
      setMessages(res.data);
    } catch (error) {
      console.error('Failed to fetch messages', error);
      toast.error(t('CHAT.FETCH_MESSAGES_ERROR') || 'Không thể tải tin nhắn!');
    }
  }, [selectedRoom?.id, t]);

  useEffect(() => {
    if (!selectedRoom?.id) {
      setMessages([]);
      return;
    }

    fetchMessages();
    toast.success(t('CHAT.ROOM_LOADED') || 'Đã tải phòng chat!');

    const interval = setInterval(fetchMessages, 3000);

    return () => clearInterval(interval);
  }, [fetchMessages, selectedRoom?.id, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!selectedRoom || !text.trim()) return;

    const toastId = toast.loading(t('CHAT.SENDING') || 'Đang gửi tin nhắn...');

    try {
      // Vẫn dùng API gọi qua HTTP để ném lên server lưu Database.
      // Khi server lưu xong, TỰ NÓ SẼ BƠM TIN NHẮN qua WebSocket về lại cho mình (và người kia).
      await chatApi.sendMessage(selectedRoom.id, text, senderType);
      await fetchMessages();

      toast.dismiss(toastId);
      toast.success(t('CHAT.SEND_SUCCESS') || 'Gửi tin nhắn thành công!');
    } catch (error) {
      console.error('Failed to send message', error);

      toast.dismiss(toastId);
      toast.error(t('CHAT.SEND_ERROR') || 'Gửi tin nhắn thất bại!');
    }
  };

  const handleDraftContract = async () => {
    if (!selectedRoom) return;

    const toastId = toast.loading(
      t('CHAT.AI_DRAFTING') || 'AI đang soạn thảo hợp đồng...'
    );

    try {
      setIsDrafting(true);
      const res = await contractAPI.aiDraftContract(selectedRoom.id);
      setDraftData(res.data);
      setShowModal(true);

      toast.dismiss(toastId);
      toast.success(
        t('CHAT.DRAFT_SUCCESS') || 'Soạn thảo hợp đồng thành công!'
      );
    } catch (err) {
      console.error('Draft contract failed', err);

      toast.dismiss(toastId);
      toast.error(t('CHAT.DRAFT_ERROR') || 'Soạn thảo hợp đồng thất bại!');
    } finally {
      setIsDrafting(false);
    }
  };

  const handleSendContract = async () => {
    if (!selectedRoom?.id) {
      toast.error(t('CHAT.NO_ROOM_SELECTED') || 'Chưa chọn phòng chat!');
      return;
    }

    const toastId = toast.loading(
      t('CHAT.SENDING_CONTRACT') || 'Đang gửi hợp đồng...'
    );

    try {
      const res = await contractAPI.getContractByRoom(selectedRoom.id);

      if (!res?.data) {
        throw new Error('No contract data received');
      }

      const contract = res.data;

      await chatApi.sendContractMessage(selectedRoom.id, contract, senderType);

      await fetchMessages();

      toast.dismiss(toastId);
      toast.success(
        t('CHAT.SEND_CONTRACT_SUCCESS') || 'Gửi hợp đồng thành công!',
        { icon: '📄' }
      );
    } catch (error: unknown) {
      console.error('Send contract failed:', error);
      toast.dismiss(toastId);

      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          toast.error(
            t('CHAT.CONTRACT_NOT_FOUND') || 'Không tìm thấy hợp đồng!'
          );
        } else if (error.response?.status === 403) {
          toast.error(
            t('CHAT.CONTRACT_NO_PERMISSION') ||
              'Bạn không có quyền gửi hợp đồng này!'
          );
        } else {
          toast.error(
            t('CHAT.SEND_CONTRACT_ERROR') || 'Gửi hợp đồng thất bại!'
          );
        }
      } else if (error instanceof Error) {
        if (error.message === 'No contract data received') {
          toast.error(t('CHAT.CONTRACT_EMPTY') || 'Dữ liệu hợp đồng trống!');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error(t('CHAT.SEND_CONTRACT_ERROR') || 'Gửi hợp đồng thất bại!');
      }
    }
  };

  if (!selectedRoom) {
    return (
      <div className="flex-1 bg-white rounded-2xl border border-neutral-200 flex items-center justify-center">
        <p className="text-neutral-500">{t('CHAT.SELECT_ROOM')}</p>
      </div>
    );
  }

  // ✅ Hàm isMine đơn giản
  const isMine = (msgSenderType: string) => {
    return msgSenderType === senderType;
  };

  if (!selectedRoom) {
    return (
      <div className="flex-1 bg-white rounded-2xl border border-neutral-200 flex items-center justify-center">
        <p className="text-neutral-500"> Chọn một cuộc hội thoại để bắt đầu </p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white rounded-2xl border border-neutral-200 flex flex-col overflow-hidden">
      <ChatHeader room={selectedRoom} viewerType={senderType} />

      <div className="flex-1 bg-neutral-50 p-6 space-y-5 overflow-y-auto">
        {user &&
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              text={msg.content}
              time={new Date(msg.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
              mine={isMine(msg.senderType)}
              currentUserRole={user?.role}
              currentUserId={user?.id}
              onContractSigned={fetchMessages}
            />
          ))}

        <div ref={messagesEndRef} />
      </div>

      {isDrafting && (
        <div className="text-xs text-neutral-500 px-4 py-2 bg-yellow-50 border-t border-yellow-100">
          {t('CHAT.AI_DRAFTING')}...
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
            await fetchMessages();
            toast.success(
              t('CHAT.CONTRACT_SAVED') || 'Lưu hợp đồng thành công!'
            );
          }}
        />
      )}
    </div>
  );
}
