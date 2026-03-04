'use client';

import { useState } from 'react';
import { Post, PostType, Author } from '../../../../types/posts';

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

  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [expectedDate, setExpectedDate] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) return;

    // ✅ Author đúng type
    const author: Author = {
      id: 1,
      name: 'Bạn',
      avatar: '/avatar.jpg',
    };

    // ✅ BasePost đúng cấu trúc
    const base = {
      id: Date.now(),
      content,
      createdAt: new Date().toISOString(),
      reactions: {},
      comments: [],
      author,
    };

    let newPost: Post;

    if (type === 'ANNOUNCEMENT') {
      newPost = {
        ...base,
        type: 'ANNOUNCEMENT',
      };
    } else if (type === 'COLLECTION') {
      if (!productName || !expectedDate) return;

      newPost = {
        ...base,
        type: 'COLLECTION',
        productName,
        expectedDate,
        totalCommitted: 0,
      };
    } else {
      if (!productName || !quantity || !price) return;

      newPost = {
        ...base,
        type: 'SELL',
        productName,
        quantity: Number(quantity),
        price: Number(price),
        negotiations: 0,
      };
    }

    onCreate(newPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl w-[420px] space-y-4">
        <h2 className="font-bold text-lg">Tạo bài đăng</h2>

        <select
          value={type}
          onChange={(e) => setType(e.target.value as PostType)}
          className="w-full border p-2 rounded-lg"
        >
          <option value="ANNOUNCEMENT">📢 Thông báo</option>
          <option value="COLLECTION">🌾 Thu gom</option>
          <option value="SELL">💰 Bán</option>
        </select>

        <textarea
          placeholder="Nhập nội dung..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded-lg"
        />

        {(type === 'COLLECTION' || type === 'SELL') && (
          <input
            type="text"
            placeholder="Tên sản phẩm"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border p-2 rounded-lg"
          />
        )}

        {type === 'COLLECTION' && (
          <input
            type="date"
            value={expectedDate}
            onChange={(e) => setExpectedDate(e.target.value)}
            className="w-full border p-2 rounded-lg"
          />
        )}

        {type === 'SELL' && (
          <>
            <input
              type="number"
              placeholder="Số lượng (tấn)"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border p-2 rounded-lg"
            />
            <input
              type="number"
              placeholder="Giá (đ/kg)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border p-2 rounded-lg"
            />
          </>
        )}

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Hủy</button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Đăng
          </button>
        </div>
      </div>
    </div>
  );
}
