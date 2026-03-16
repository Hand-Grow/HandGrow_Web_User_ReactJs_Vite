'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';

import { ChatMessage, ChatRoom, DraftContractData } from '@/src/types';
import { contractAPI } from '@/src/services/contract/aiContractService';
import ContractFormModal from './components/ContractModal';
import { chatApi } from '@/src/services/chat/chatApi';

import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

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

  const stompClientRef = useRef<Client | null>(null);

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
    if (!selectedRoom?.id) {
      setMessages([]);
      return;
    }

    fetchMessages();

    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
    const socket = new SockJS(`${baseUrl}/ws`);

    const token = localStorage.getItem('accessToken');

    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: token ? `Bearer ${token}` : '',
      },
      reconnectDelay: 5000, // Rớt mạng tự gọi lại sau 5 giây
      heartbeatIncoming: 4000, // Nhịp tim chống sập kết nối
      heartbeatOutgoing: 4000,

      onConnect: () => {
        console.log(
          '✅ Đã nối cáp WebSocket thành công vào phòng:',
          selectedRoom.id
        );

        // 3. Đăng ký hóng tin nhắn (Subscribe) từ Topic của phòng này
        client.subscribe(`/topic/room/${selectedRoom.id}`, (msg) => {
          const newMessage: ChatMessage = JSON.parse(msg.body);

          // Khi có tin nhắn mới từ mây rớt xuống, chỉ cần nối nó vào đuôi mảng hiện tại
          setMessages((prev) => {
            // Check nhẹ để tránh bị trùng lặp ID nếu React lỡ render 2 lần
            if (prev.some((m) => m.id === newMessage.id)) return prev;
            return [...prev, newMessage];
          });
        });
      },
      onStompError: (frame) => {
        console.error('❌ Lỗi Broker STOMP: ' + frame.headers['message']);
      },
      onWebSocketError: (event) => {
        console.error('❌ Lỗi kết nối mạng WS:', event);
      },
    });

    // Kích hoạt đường ống
    client.activate();
    stompClientRef.current = client;

    // 4. HÀNH ĐỘNG SINH TỬ: Dọn dẹp rác khi thoát phòng
    return () => {
      if (client.active) {
        client.deactivate();
        console.log('🛑 Đã rút cáp WebSocket phòng:', selectedRoom.id);
      }
    };
  }, [selectedRoom?.id, fetchMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!selectedRoom || !text.trim()) return;

    try {
      // Vẫn dùng API gọi qua HTTP để ném lên server lưu Database.
      // Khi server lưu xong, TỰ NÓ SẼ BƠM TIN NHẮN qua WebSocket về lại cho mình (và người kia).
      await chatApi.sendMessage(selectedRoom.id, text, senderType);

      // XÓA cái fetchMessages() ở đây! Không được spam load lại nguyên 100 tin nhắn nữa!
      // WebSocket sẽ lo việc update UI.
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
      // Xóa nốt chữ fetchMessages() ở đây
    } catch (error) {
      console.error('Send contract failed', error);
    }
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
          }}
        />
      )}
    </div>
  );
}
