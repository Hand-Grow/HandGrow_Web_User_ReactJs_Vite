'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import {
  MapPin,
  Star,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  Sprout,
} from 'lucide-react';
import { PRODUCE_LABELS, ProduceType } from '@/src/constants';
import { chatApi } from '@/src/services/chat/chatApi';
import { MarketplacePost } from '@/src/types';
import { TFunction } from 'i18next';

interface ProductCardProps {
  product: MarketplacePost;
}

const getDisplayName = (productName: string, t: TFunction): string => {
  const upperName = productName.toUpperCase();

  if (PRODUCE_LABELS[upperName as keyof typeof PRODUCE_LABELS]) {
    return PRODUCE_LABELS[upperName as keyof typeof PRODUCE_LABELS];
  }

  // Fallback với key locale
  const fallbackMap: Record<string, string> = {
    RICE: t('PRODUCT.RICE'),
    CORN: t('PRODUCT.CORN'),
    VEGETABLE: t('PRODUCT.VEGETABLE'),
    FRUIT: t('PRODUCT.FRUIT'),
    COFFEE: t('PRODUCT.COFFEE'),
    TEA: t('PRODUCT.TEA'),
    RUBBER: t('PRODUCT.RUBBER'),
    SUGARCANE: t('PRODUCT.SUGARCANE'),
    CASSAVA: t('PRODUCT.CASSAVA'),
    PEPPER: t('PRODUCT.PEPPER'),
    COCONUT: t('PRODUCT.COCONUT'),
    CASHEW: t('PRODUCT.CASHEW'),
    AQUACULTURE: t('PRODUCT.AQUACULTURE'),
    LIVESTOCK: t('PRODUCT.LIVESTOCK'),
  };

  for (const [key, value] of Object.entries(fallbackMap)) {
    if (upperName.includes(key)) return value;
  }

  return productName;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleContact = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product?.id) {
      toast.error(t('MARKETPLACE.ERRORS.PRODUCT_NOT_FOUND'));
      return;
    }

    try {
      setIsCreatingChat(true);
      const res = await chatApi.createRoom(product.id.toString());
      if (res.data && res.data.id) {
        router.push(`/company/messages?roomId=${res.data.id}`);
      } else {
        toast.error(t('MARKETPLACE.ERRORS.CANNOT_CREATE_CHAT'));
      }
    } catch (error: unknown) {
      console.error('Error creating chat room:', error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err.response?.data?.message ||
          t('MARKETPLACE.ERRORS.CHAT_CREATION_FAILED')
      );
    } finally {
      setIsCreatingChat(false);
    }
  };

  const productType = product.productName as ProduceType;
  const displayName =
    PRODUCE_LABELS[productType] || getDisplayName(product.productName, t);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden relative">
      {/* Image Section */}
      {product.attachments && product.attachments.length > 0 ? (
        <div className="relative">
          <div className="relative h-44 w-full">
            <img
              src={product.attachments[currentImageIndex]}
              alt={displayName}
              className="h-44 w-full object-cover cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsImageModalOpen(true);
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://picsum.photos/600/400?random=${product.id}`;
              }}
            />

            {/* Image counter */}
            {product.attachments.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {currentImageIndex + 1}/{product.attachments.length}
              </div>
            )}

            {/* Navigation arrows */}
            {product.attachments.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) =>
                      prev === 0 ? product.attachments!.length - 1 : prev - 1
                    );
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) =>
                      prev === product.attachments!.length - 1 ? 0 : prev + 1
                    );
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        // Placeholder when no image
        <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 h-44 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Sprout size={32} className="text-green-600" />
            </div>
            <p className="text-sm text-gray-600 font-medium">
              {t('MARKETPLACE.NO_IMAGE')}
            </p>
            <p className="text-xs text-gray-500 mt-1">{displayName}</p>
          </div>
        </div>
      )}

      {/* Status badge */}
      <div className="absolute top-3 left-3">
        <span
          className={`text-xs px-2 py-1 rounded ${
            product.status === 'OPEN'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {product.status === 'OPEN'
            ? t('MARKETPLACE.STATUS.OPEN')
            : t('MARKETPLACE.STATUS.GATHERING')}
        </span>
      </div>

      {/* Date badge */}
      <div className="absolute top-3 right-3">
        <span className="bg-white/90 text-xs px-2 py-1 rounded text-gray-600">
          {new Date(product.createdAt).toLocaleDateString('vi-VN')}
        </span>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <div className="relative">
              {product.attachments && product.attachments.length > 0 ? (
                <img
                  src={product.attachments[currentImageIndex]}
                  alt={displayName}
                  className="w-full h-full object-contain rounded-lg max-h-[80vh]"
                  onClick={(e) => e.stopPropagation()}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://picsum.photos/1200/800?random=${product.id}`;
                  }}
                />
              ) : (
                <img
                  src={`https://picsum.photos/1200/800?random=${product.id}`}
                  alt={displayName}
                  className="w-full h-full object-contain rounded-lg max-h-[80vh]"
                  onClick={(e) => e.stopPropagation()}
                />
              )}

              {/* Modal navigation */}
              {product.attachments && product.attachments.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) =>
                        prev === 0 ? product.attachments!.length - 1 : prev - 1
                      );
                    }}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) =>
                        prev === product.attachments!.length - 1 ? 0 : prev + 1
                      );
                    }}
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Modal image counter */}
              {product.attachments && product.attachments.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded">
                  {currentImageIndex + 1} / {product.attachments.length}
                </div>
              )}
            </div>

            {/* Close button */}
            <button
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 transition-colors"
              onClick={() => setIsImageModalOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-base line-clamp-2">
            {displayName}
          </h3>
          <p className="text-sm text-neutral-500 mt-1">{product.coopName}</p>
        </div>

        <div className="flex items-center gap-3 text-xs text-neutral-500">
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {t('COMMON.VIETNAM')}
          </span>
          <span className="text-gray-400">
            • {new Date(product.createdAt).toLocaleDateString('vi-VN')}
          </span>
        </div>

        <div className="space-y-2">
          <div className="text-orange-600 font-bold text-lg">
            {product.expectedPrice
              ? t('PRODUCTS.PRICE_PER_KG', {
                  price: product.expectedPrice.toLocaleString('vi-VN'),
                })
              : t('MARKETPLACE.CONTACT_FOR_PRICE')}
          </div>

          <p className="text-xs text-neutral-500">
            {product.totalQuantity > 0
              ? t('MARKETPLACE.QUANTITY_TONS', {
                  quantity: product.totalQuantity.toLocaleString('vi-VN'),
                })
              : t('MARKETPLACE.CONTACT_FOR_PRICE')}
          </p>
        </div>

        <div className="flex gap-3 mt-3">
          <button
            className="flex-1 bg-emerald-600 text-white py-2 rounded-xl hover:bg-emerald-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleContact}
            disabled={isCreatingChat}
          >
            {isCreatingChat ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {t('COMMON.PROCESSING')}
              </>
            ) : (
              t('MARKETPLACE.CONTACT')
            )}
          </button>
          {/* <button className="w-11 h-11 border rounded-xl flex items-center justify-center hover:bg-neutral-100 transition">
            <Star size={18} />
          </button> */}
        </div>
      </div>
    </div>
  );
}
