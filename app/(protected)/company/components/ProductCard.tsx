'use client';

import { useTranslation } from 'react-i18next';
import { PRODUCE_LABELS, ProduceType } from '@/src/constants';
import { MarketplacePost } from '@/src/types';

interface ProductCardProps {
  product: MarketplacePost;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation();

  const productType = product.productName as ProduceType;
  const productNameVi = PRODUCE_LABELS[productType] || product.productName;

  const formatPrice = (price?: number) => {
    if (!price) return t('MARKETPLACE.CONTACT_FOR_PRICE');

    return t('MARKETPLACE.PRICE_FORMAT', {
      price: price.toLocaleString('vi-VN'),
      unit: 'kg',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getStatusText = (status: 'OPEN' | 'GATHERING') => {
    return status === 'OPEN'
      ? t('MARKETPLACE.STATUS.OPEN')
      : t('MARKETPLACE.STATUS.GATHERING');
  };

  const getStatusClass = (status: 'OPEN' | 'GATHERING') => {
    return status === 'OPEN'
      ? 'bg-green-100 text-green-700'
      : 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
      <div className="aspect-square bg-gray-100 relative">
        {product.attachments && product.attachments.length > 0 ? (
          <img
            src={product.attachments[0]}
            alt={productNameVi}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">{t('MARKETPLACE.NO_IMAGE')}</span>
          </div>
        )}

        {/* STATUS */}
        <div
          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(product.status)}`}
        >
          {getStatusText(product.status)}
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* NAME */}
        <h3 className="font-semibold text-lg line-clamp-2 min-h-14">
          {productNameVi}
        </h3>

        {/* INFO */}
        <div className="space-y-2 text-sm">
          <p className="text-gray-600">
            <span className="font-medium">{t('MARKETPLACE.COOPERATIVE')}:</span>{' '}
            {product.coopName}
          </p>

          <p className="text-gray-600">
            <span className="font-medium">{t('MARKETPLACE.QUANTITY')}:</span>{' '}
            {product.totalQuantity.toLocaleString('vi-VN')} kg
          </p>
        </div>

        {/* PRICE */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div>
            <span className="text-lg font-bold text-green-600">
              {formatPrice(product.expectedPrice)}
            </span>
          </div>

          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
            onClick={() => console.log('View detail:', product.id)}
          >
            {t('MARKETPLACE.VIEW_DETAILS')}
          </button>
        </div>

        {/* DATE */}
        <p className="text-xs text-gray-400">
          {t('MARKETPLACE.POSTED_DATE', {
            date: formatDate(product.createdAt),
          })}
        </p>
      </div>
    </div>
  );
}
