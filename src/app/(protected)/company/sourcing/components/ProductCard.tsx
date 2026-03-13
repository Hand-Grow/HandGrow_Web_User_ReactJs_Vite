import React, { useState } from 'react';
import { MapPin, Star, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { PRODUCE_LABELS } from '../../../../../../constants/produce';
import { chatApi } from '../../../../../../services/chat/chatApi';

interface ProductCardProps {
  product?: {
    id: string;
    campaignId: string;
    productName: string;
    totalQuantity: number;
    expectedPrice: number;
    status: string;
    coopName: string;
    createdAt: string;
  };
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

  if (!product) {
    return (
      <div className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition overflow-hidden">
        <div className="relative">
          <img
            src="https://picsum.photos/600/400"
            className="h-44 w-full object-cover"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded">
              VietGAP
            </span>
            <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded">
              Organic
            </span>
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
      const res = await chatApi.createRoom(product.id);
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
    <div
      className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer"
      onClick={handleViewDetails}
    >
      <div className="relative">
        <img
          src={`https://picsum.photos/600/400?random=${product.id}`}
          className="h-44 w-full object-cover"
        />
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
      </div>

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

          {/* <button
            className="w-11 h-11 border rounded-xl flex items-center justify-center hover:bg-neutral-100 transition"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Star size={18} />
          </button> */}
        </div>
      </div>
    </div>
  );
}
