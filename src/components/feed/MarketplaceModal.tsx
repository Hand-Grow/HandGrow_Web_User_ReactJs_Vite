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

  const mainImage =
    post.attachments && post.attachments.length > 0
      ? post.attachments[0]
      : null;

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden border group flex flex-col">
      {/* Image Preview */}
      <div className="h-48 overflow-hidden bg-gray-100 relative">
        {mainImage ? (
          <img
            src={mainImage}
            alt={productLabel}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Package size={48} className="opacity-20" />
          </div>
        )}

        <div className="absolute top-3 right-3">
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold shadow-sm
            ${
              post.status === 'OPEN'
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
            }
            `}
          >
            {post.status === 'OPEN' ? 'Đang thu gom' : 'Đang mở bán'}
          </span>
        </div>
      </div>

      <div className="p-5 space-y-4 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 leading-tight">
          {productLabel}
        </h3>

        <div className="space-y-2.5 flex-1">
          <div className="flex items-center gap-2.5 text-sm text-gray-600">
            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
              <Store size={16} />
            </div>
            <span className="font-medium">{post.coopName}</span>
          </div>

          <div className="flex items-center gap-2.5 text-sm text-gray-600">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <Package size={16} />
            </div>
            <span>
              {post.totalQuantity > 0
                ? `${post.totalQuantity} tấn`
                : 'Đang thu gom'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-sm text-gray-600">
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <Coins size={16} />
            </div>
            <span className="font-semibold text-gray-900">
              {post.expectedPrice
                ? `${post.expectedPrice.toLocaleString('vi-VN')} đ/kg`
                : 'Chưa cập nhật giá'}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            {new Date(post.createdAt).toLocaleDateString('vi-VN')}
          </div>

          <button className="text-green-600 font-semibold hover:underline">
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}
