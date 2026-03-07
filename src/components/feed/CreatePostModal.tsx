'use client';

import { useState, useEffect } from 'react';
import { X, Megaphone, Sprout } from 'lucide-react';
import { Post, PostType } from '@/src/types';
import { feedService } from '@/services/feedService';
import { authService } from '@/services/authService';
import { PRODUCE_LABELS, PRODUCE_VALUES, ProduceType } from '@/constants';

interface CreatePostModalProps {
  onClose: () => void;
  onCreate: (post: Post) => void;
}

export default function CreatePostModal({
  onClose,
  onCreate,
}: CreatePostModalProps) {
  const [type, setType] = useState<PostType>('ANNOUNCEMENT');

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const [productName, setProductName] = useState<ProduceType>('RICE');
  const [expectedDate, setExpectedDate] = useState('');

  const [loading, setLoading] = useState(false);
  const [coopId, setCoopId] = useState<string>('');

  useEffect(() => {
    const loadProfile = async () => {
      const user = await authService.getProfile();
      setCoopId(user.id);
    };

    loadProfile();
  }, []);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
      setLoading(true);

      let newPost: Post;

      if (type === 'ANNOUNCEMENT') {
        newPost = await feedService.createAnnouncement(coopId, {
          title,
          content,
        });
      } else {
        if (!productName || !expectedDate) return;

        newPost = await feedService.createCampaign(coopId, {
          productName,
          expectedDate,
        });
      }

      onCreate(newPost);
      onClose();
    } catch (err) {
      console.error('Create post failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-105 rounded-2xl shadow-xl animate-in fade-in zoom-in p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Tạo bài đăng</h2>

          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        {/* Type */}
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Loại bài đăng</label>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setType('ANNOUNCEMENT')}
              className={`flex items-center gap-2 justify-center p-2 rounded-lg border ${
                type === 'ANNOUNCEMENT'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200'
              }`}
            >
              <Megaphone size={16} />
              Thông báo
            </button>

            <button
              onClick={() => setType('CAMPAIGN')}
              className={`flex items-center gap-2 justify-center p-2 rounded-lg border ${
                type === 'CAMPAIGN'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200'
              }`}
            >
              <Sprout size={16} />
              Thu gom
            </button>
          </div>
        </div>

        {/* Announcement fields */}
        {type === 'ANNOUNCEMENT' && (
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Tiêu đề</label>
            <input
              placeholder="Nhập tiêu đề..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
        )}

        {/* Content */}
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Nội dung</label>

          <textarea
            rows={4}
            placeholder="Nhập nội dung bài đăng..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Campaign fields */}
        {type === 'CAMPAIGN' && (
          <>
            <div className="space-y-2">
              <label className="text-sm text-gray-500">Sản phẩm thu gom</label>

              <select
                value={productName}
                onChange={(e) => setProductName(e.target.value as ProduceType)}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
              >
                {PRODUCE_VALUES.map((value) => (
                  <option key={value} value={value}>
                    {PRODUCE_LABELS[value]}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-500">Ngày dự kiến</label>

              <input
                type="date"
                value={expectedDate}
                onChange={(e) => setExpectedDate(e.target.value)}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
          </>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border hover:bg-gray-50"
          >
            Hủy
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Đang đăng...' : 'Đăng bài'}
          </button>
        </div>
      </div>
    </div>
  );
}
