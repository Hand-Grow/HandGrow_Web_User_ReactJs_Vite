'use client';

import { useState } from 'react';
import { PRODUCE_LABELS, ProduceType } from '@/src/constants/produce';
import { MarketplacePost } from '@/src/types';

import {
  Package,
  Calendar,
  Store,
  Coins,
  Image,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
} from 'lucide-react';

interface Props {
  post: MarketplacePost;
  onEdit?: (post: MarketplacePost) => void;
  onDelete?: (post: MarketplacePost) => void;
}

export default function MarketplaceCard({ post, onEdit, onDelete }: Props) {
  const productLabel =
    PRODUCE_LABELS[post.productName as ProduceType] ?? post.productName;

  const images = post.attachments ?? [];
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1">
      {/* IMAGE SLIDER */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {images.length > 0 ? (
          <img
            src={images[index]}
            alt={productLabel}
            className="w-full h-full object-cover transition duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <Package size={42} className="opacity-30" />
          </div>
        )}

        {/* SLIDER BUTTONS */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow"
            >
              <ChevronRight size={18} />
            </button>

            <div className="absolute bottom-3 right-3 text-xs bg-black/60 text-white px-2 py-1 rounded flex items-center gap-1">
              <Image size={14} />
              {index + 1}/{images.length}
            </div>
          </>
        )}

        {/* STATUS */}
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold
            ${
              post.status === 'OPEN'
                ? 'bg-green-500 text-white'
                : 'bg-yellow-500 text-white'
            }`}
          >
            {post.status === 'OPEN' ? 'Đang thu gom' : 'Đang mở bán'}
          </span>
        </div>

        {/* ACTION BUTTONS */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => onEdit?.(post)}
            className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100"
          >
            <Pencil size={16} className="text-blue-600" />
          </button>

          <button
            onClick={() => onDelete?.(post)}
            className="bg-white p-1.5 rounded-full shadow hover:bg-gray-100"
          >
            <Trash2 size={16} className="text-red-500" />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col gap-4 flex-1">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
          {productLabel}
        </h3>

        <div className="space-y-2 text-sm text-gray-600 flex-1">
          <div className="flex items-center gap-2">
            <Store size={16} className="text-green-600" />
            <span className="truncate">{post.coopName}</span>
          </div>

          <div className="flex items-center gap-2">
            <Package size={16} className="text-blue-500" />
            <span>
              {/* ĐÃ SỬA: Hiển thị số lượng trực tiếp, không check điều kiện */}
              {post.totalQuantity} tấn
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Coins size={16} className="text-amber-500" />
            <span className="font-bold text-green-700">
              {post.expectedPrice
                ? `${post.expectedPrice.toLocaleString('vi-VN')} đ/kg`
                : 'Chưa có giá'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400 pt-3">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            {new Date(post.createdAt).toLocaleDateString('vi-VN')}
          </div>

          <button className="text-green-600 font-semibold hover:text-green-700">
            Xem chi tiết →
          </button>
        </div>
      </div>
    </div>
  );
}
