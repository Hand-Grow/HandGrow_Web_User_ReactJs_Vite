'use client';

import { PRODUCE_LABELS, ProduceType } from '@/constants/produce';
import { MarketplacePost } from '@/src/types';

import { Package, Calendar, Store, Coins } from 'lucide-react';

interface Props {
  post: MarketplacePost;
}

export default function MarketplaceCard({ post }: Props) {
  const productLabel =
    PRODUCE_LABELS[post.productName as ProduceType] ?? post.productName;

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition p-5 space-y-4 border">
      <h3 className="text-lg font-semibold text-gray-800"> {productLabel}</h3>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Store size={16} />
        {post.coopName}
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Package size={16} />
        {post.totalQuantity > 0 ? `${post.totalQuantity} tấn` : 'Đang thu gom'}
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Coins size={16} />
        {post.expectedPrice
          ? `${post.expectedPrice.toLocaleString('vi-VN')} đ/kg`
          : 'Chưa cập nhật giá'}
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Calendar size={16} />
        {new Date(post.createdAt).toLocaleDateString('vi-VN')}
      </div>

      <span
        className={`text-xs px-3 py-1 rounded-full font-medium
        ${
          post.status === 'OPEN'
            ? 'bg-green-100 text-green-700'
            : 'bg-yellow-100 text-yellow-700'
        }
        `}
      >
        {post.status === 'OPEN' ? 'Đang thu gom' : 'Đang mở bán'}
      </span>
    </div>
  );
}
