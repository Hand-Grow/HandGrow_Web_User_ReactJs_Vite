'use client';

import { useState, useEffect } from 'react';
import { Post, PostType } from '@/src/types';
import { feedService } from '@/services/feedService';
import { authService } from '@/services/authService';

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

  const [productName, setProductName] = useState('');
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
          productName: productName,
          expectedDate: expectedDate,
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
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl w-105 space-y-4">
        <h2 className="font-bold text-lg">Tạo bài đăng</h2>

        <select
          value={type}
          onChange={(e) => setType(e.target.value as PostType)}
          className="w-full border p-2 rounded-lg"
        >
          <option value="ANNOUNCEMENT">📢 Thông báo</option>
          <option value="CAMPAIGN">🌾 Thu gom</option>
        </select>

        {type === 'ANNOUNCEMENT' && (
          <input
            placeholder="Tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded-lg"
          />
        )}

        <textarea
          placeholder="Nhập nội dung..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded-lg"
        />

        {type === 'CAMPAIGN' && (
          <>
            <input
              type="text"
              placeholder="Tên sản phẩm"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full border p-2 rounded-lg"
            />

            <input
              type="date"
              value={expectedDate}
              onChange={(e) => setExpectedDate(e.target.value)}
              className="w-full border p-2 rounded-lg"
            />
          </>
        )}

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Hủy</button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            {loading ? 'Đang đăng...' : 'Đăng'}
          </button>
        </div>
      </div>
    </div>
  );
}
