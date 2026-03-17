import React, { useState } from 'react';
import {
  MapPin,
  Star,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  Sprout,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { PRODUCE_LABELS } from '@/src/constants';
import { chatApi } from '@/src/services/chat/chatApi';
import { MarketplacePost } from '@/src/types/posts';

interface ProductCardProps {
  product?: MarketplacePost;
}

const getDisplayName = (productName: string): string => {
  const upperName = productName.toUpperCase();

  if (PRODUCE_LABELS[upperName as keyof typeof PRODUCE_LABELS]) {
    return PRODUCE_LABELS[upperName as keyof typeof PRODUCE_LABELS];
  }

  if (upperName.includes('RICE')) return 'Lúa gạo';
  if (upperName.includes('CORN')) return 'Ngô';
  if (upperName.includes('VEGETABLE')) return 'Rau củ';
  if (upperName.includes('FRUIT')) return 'Trái cây';
  if (upperName.includes('COFFEE')) return 'Cà phê';
  if (upperName.includes('TEA')) return 'Chè';
  if (upperName.includes('RUBBER')) return 'Cao su';
  if (upperName.includes('SUGARCANE')) return 'Mía';
  if (upperName.includes('CASSAVA')) return 'Sắn';
  if (upperName.includes('PEPPER')) return 'Tiêu';
  if (upperName.includes('COCONUT')) return 'Dừa';
  if (upperName.includes('CASHEW')) return 'Điều';
  if (upperName.includes('AQUACULTURE')) return 'Thủy sản';
  if (upperName.includes('LIVESTOCK')) return 'Chăn nuôi';

  return productName;
};

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src="https://picsum.photos/600/400"
            className="h-44 w-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            1/1
          </div>
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-base">Lúa ST25</h3>
          <p className="text-sm text-neutral-500">HTX Nông nghiệp An Phước</p>
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              An Giang
            </span>
            <span className="flex items-center gap-1 text-orange-500">
              <Star size={14} fill="currentColor" />
              4.8
            </span>
          </div>
          <div className="text-orange-600 font-bold text-lg">9,000 đ/kg</div>
          <p className="text-xs text-neutral-500">
            Tối thiểu: 10 tấn • Có sẵn: 450 tấn
          </p>
          <div className="flex gap-3 mt-3">
            <button className="flex-1 bg-emerald-600 text-white py-2 rounded-xl hover:bg-emerald-700 transition">
              Liên hệ HTX
            </button>
            <button className="w-11 h-11 border rounded-xl flex items-center justify-center hover:bg-neutral-100 transition">
              <Star size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleViewDetails = () => {
    router.push(`/company/sourcing/${product.id}`);
  };

  const handleContact = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product?.id) {
      toast.error('Không tìm thấy thông tin sản phẩm');
      return;
    }

    try {
      setIsCreatingChat(true);
      const res = await chatApi.createRoom(product.id.toString());
      if (res.data && res.data.id) {
        router.push(`/company/messages?roomId=${res.data.id}`);
      } else {
        toast.error('Không thể tạo phòng chat');
      }
    } catch (error: unknown) {
      console.error('Lỗi khi tạo phòng chat:', error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        err.response?.data?.message || 'Có lỗi xảy ra khi tạo phòng chat'
      );
    } finally {
      setIsCreatingChat(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden relative">
      {product.attachments && product.attachments.length > 0 && (
        <div className="relative">
          <div className="relative h-44 w-full">
            <img
              src={product.attachments[currentImageIndex]}
              alt={`${product.productName} - Image ${currentImageIndex + 1}`}
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
            {product.attachments.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {currentImageIndex + 1}/{product.attachments.length}
              </div>
            )}
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
      )}

      {(!product.attachments || product.attachments.length === 0) && (
        <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 h-44 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Sprout size={32} className="text-green-600" />
            </div>
            <p className="text-sm text-gray-600 font-medium">
              Không có hình ảnh
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {getDisplayName(product.productName)}
            </p>
          </div>
        </div>
      )}

      <div className="absolute top-3 left-3">
        <span
          className={`text-xs px-2 py-1 rounded ${
            product.status === 'OPEN'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {product.status === 'OPEN' ? 'Đang mở' : 'Đã đóng'}
        </span>
      </div>
      <div className="absolute top-3 right-3">
        <span className="bg-white/90 text-xs px-2 py-1 rounded text-gray-600">
          {new Date(product.createdAt).toLocaleDateString('vi-VN')}
        </span>
      </div>

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
                  alt={`${product.productName} - Image ${currentImageIndex + 1}`}
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
                  alt={product.productName}
                  className="w-full h-full object-contain rounded-lg max-h-[80vh]"
                  onClick={(e) => e.stopPropagation()}
                />
              )}

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

              {product.attachments && product.attachments.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded">
                  {currentImageIndex + 1} / {product.attachments.length}
                </div>
              )}
            </div>

            <button
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 transition-colors"
              onClick={() => setIsImageModalOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-base">
            {getDisplayName(product.productName)}
          </h3>
          <p className="text-sm text-neutral-500">{product.coopName}</p>
        </div>

        <div className="flex items-center gap-3 text-xs text-neutral-500">
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            Việt Nam
          </span>
          <span className="text-gray-400">
            • {new Date(product.createdAt).toLocaleDateString('vi-VN')}
          </span>
        </div>

        <div className="space-y-2">
          <div className="text-orange-600 font-bold text-lg">
            {product.expectedPrice
              ? `${product.expectedPrice.toLocaleString('vi-VN')} đ/kg`
              : 'Giá liên hệ'}
          </div>

          <p className="text-xs text-neutral-500">
            {product.totalQuantity > 0
              ? `Số lượng: ${product.totalQuantity.toLocaleString('vi-VN')} tấn`
              : 'Số lượng: Liên hệ'}
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
                Đang xử lý...
              </>
            ) : (
              'Liên hệ'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
