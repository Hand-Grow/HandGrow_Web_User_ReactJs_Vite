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

import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface Props {
  selectedRoom: ChatRoom | undefined;
  senderType: 'COOPERATIVE' | 'ENTERPRISE';
}

export default function ChatWindow({ selectedRoom, senderType }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const [isDrafting, setIsDrafting] = useState(false);
  const [draftData, setDraftData] = useState<DraftContractData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  const stompClientRef = useRef<Client | null>(null);

  // ─── Lấy profile user (dùng để render avatar & check "mine") ───────────────
  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await authService.getProfile();
      setUser(profile);
    };
    fetchUserProfile();
  }, []);

  // ─── Lấy lịch sử tin nhắn khi vào phòng ────────────────────────────────────
  const fetchMessages = useCallback(async () => {
    if (!selectedRoom?.id) return;
    try {
      const res = await chatApi.getMessages(selectedRoom.id, 0, 100);
      setMessages(res.data);
    } catch (error) {
      console.error('Failed to fetch messages', error);
      toast.error(
        t('CHAT.TOAST.FETCH_MESSAGES_ERROR') || 'Không thể tải tin nhắn!'
      );
    }
  }, [selectedRoom?.id, t]);

  // ─── Kết nối WebSocket STOMP mỗi khi đổi phòng ─────────────────────────────
  useEffect(() => {
    if (!selectedRoom?.id) {
      setMessages([]);
      return;
    }

    // 1. Tải lịch sử tin nhắn lần đầu (HTTP)
    fetchMessages();

    // 2. Thiết lập kết nối WebSocket
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
    const socket = new SockJS(`${baseUrl}/ws`);
    const token = localStorage.getItem('accessToken');

    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: token ? `Bearer ${token}` : '',
      },
      reconnectDelay: 5000, // tự reconnect sau 5s nếu mất mạng
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        console.log('✅ WebSocket connected to room:', selectedRoom.id);

        // 3. Subscribe topic của phòng này
        client.subscribe(`/topic/room/${selectedRoom.id}`, (msg) => {
          const newMessage: ChatMessage = JSON.parse(msg.body);

          setMessages((prev) => {
            // Chống duplicate nếu React render 2 lần
            if (prev.some((m) => m.id === newMessage.id)) return prev;
            return [...prev, newMessage];
          });
        });
      },

      onStompError: (frame) => {
        console.error('❌ STOMP error:', frame.headers['message']);
        toast.error('Mất kết nối realtime, đang thử lại...');
      },
      onWebSocketError: (event) => {
        console.error('❌ WebSocket error:', event);
      },
    });

    client.activate();
    stompClientRef.current = client;

    // 4. Dọn dẹp khi rời phòng hoặc unmount
    return () => {
      if (client.active) {
        client.deactivate();
        console.log('🛑 WebSocket disconnected from room:', selectedRoom.id);
      }
    };
  }, [selectedRoom?.id, fetchMessages]);

  // ─── Auto-scroll xuống tin nhắn mới ────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ─── Gửi tin nhắn (HTTP → server lưu DB → server bơm WS về) ───────────────
  const handleSendMessage = async (text: string) => {
    if (!selectedRoom || !text.trim()) return;

    try {
      await chatApi.sendMessage(selectedRoom.id, text, senderType);
      // KHÔNG fetchMessages() - WebSocket sẽ tự push tin nhắn về
    } catch (error) {
      console.error('Failed to send message', error);
      toast.error(t('CHAT.SEND_ERROR') || 'Gửi tin nhắn thất bại!');
    }
  };

  // ─── AI soạn thảo hợp đồng ──────────────────────────────────────────────────
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
        t('CHAT.TOAST.DRAFT_SUCCESS') || 'Soạn thảo hợp đồng thành công!'
      );
    } catch (err) {
      console.error('Draft contract failed', err);
      toast.dismiss(toastId);
      toast.error(
        t('CHAT.TOAST.DRAFT_ERROR') || 'Soạn thảo hợp đồng thất bại!'
      );
    } finally {
      setIsDrafting(false);
    }
  };

  // ─── Gửi hợp đồng vào chat ──────────────────────────────────────────────────
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

      if (!res?.data) throw new Error('No contract data received');

      const contract = res.data;
      await chatApi.sendContractMessage(selectedRoom.id, contract, senderType);
      // KHÔNG fetchMessages() - WebSocket sẽ tự push về

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

  // ─── Format giờ (giữ UTC+7) ─────────────────────────────────────────────────
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 7);
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // ─── Empty state ─────────────────────────────────────────────────────────────
  if (!selectedRoom) {
    return (
      <div className="flex-1 bg-white rounded-2xl border border-neutral-200 flex items-center justify-center">
        <p className="text-neutral-500">{t('CHAT.SELECT_ROOM')}</p>
      </div>
    );
  }

  // ─── Main chat UI ────────────────────────────────────────────────────────────
  return (
    <div className="flex-1 bg-white rounded-2xl border border-neutral-200 flex flex-col overflow-hidden">
      <ChatHeader room={selectedRoom} viewerType={senderType} />

      <div className="flex-1 bg-neutral-50 p-6 space-y-5 overflow-y-auto">
        {user &&
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              text={msg.content}
              time={formatTime(msg.createdAt)}
              mine={msg.senderType === senderType}
              avatarUrl={msg.senderAvatarUrl}
              senderName={msg.senderName}
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
            toast.success(
              t('CHAT.CONTRACT_SAVED') || 'Lưu hợp đồng thành công!'
            );
          }}
        />
      )}
    </div>
  );
}
