'use client';

import { useState } from 'react';
import { Search, Dot } from 'lucide-react';
import { MainLayout } from '../main-layout';

interface Message {
  id: string;
  senderName: string;
  company: string;
  content: string;
  time: string;
  isRead: boolean;
}

const mockMessages: Message[] = [
  {
    id: '1',
    senderName: 'Công ty A',
    company: 'Công ty TNHH Nông sản Á',
    content: 'Cần xác nhận đơn hàng mới',
    time: '10:30',
    isRead: false,
  },
  {
    id: '2',
    senderName: 'Công ty B',
    company: 'Công ty TNHH Nông sản B',
    content: 'Có thể giao hàng tuần này không?',
    time: '09:15',
    isRead: true,
  },
  {
    id: '3',
    senderName: 'Công ty C',
    company: 'Công ty TNHH Nông sản C',
    content: 'Cập nhật giá mới cho lúa',
    time: '08:45',
    isRead: false,
  },
  {
    id: '4',
    senderName: 'Công ty D',
    company: 'Công ty TNHH Nông sản D',
    content: 'Thuyên giao hàng lần 1 hoàn tất',
    time: '07:30',
    isRead: true,
  },
  {
    id: '5',
    senderName: 'Công ty E',
    company: 'Công ty TNHH Nông sản E',
    content: 'Cần hỗ trợ xử lý khiếu nại',
    time: '06:20',
    isRead: true,
  },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = messages.filter(
    (msg) =>
      msg.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMarkAsRead = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg))
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tin nhắn</h1>
          <p className="text-gray-600 mt-1">
            Quản lý tin nhắn từ các hợp tác xã
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm tin nhắn..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            {filteredMessages.map((message) => (
              <button
                key={message.id}
                onClick={() => handleMarkAsRead(message.id)}
                className="w-full flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition text-left border-b border-gray-100 last:border-0"
              >
                <div className="relative shrink-0">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                    {message.senderName[0]}
                  </div>
                  {!message.isRead && (
                    <Dot className="absolute -top-1 -right-1 w-6 h-6 text-green-500 fill-green-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                      {message.senderName}
                    </h3>
                    <span className="text-xs text-gray-500 shrink-0">
                      {message.time}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {message.company}
                  </p>
                  <p className="text-sm text-gray-600 mt-2 truncate">
                    {message.content}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
