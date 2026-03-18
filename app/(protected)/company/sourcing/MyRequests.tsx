'use client';

import sourcingApi from '@/src/services/sourcing/sourcingApi';
import { SourcingRequestResponse } from '@/src/services/sourcing/types';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export default function MyRequests() {
  const { t } = useTranslation();
  const [requests, setRequests] = useState<SourcingRequestResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    try {
      setLoading(true);
      const response = await sourcingApi.getMyRequests();
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.content || [];

      setRequests(data);
    } catch (error) {
      console.error(t('SOURCING.ERROR.FETCH_REQUESTS'), error);
      toast.error(t('SOURCING.TOAST.FETCH_ERROR'));
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'bg-green-100 text-green-800';
      case 'CLOSED':
        return 'bg-gray-100 text-gray-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'OPEN':
        return t('SOURCING.STATUS.OPEN');
      case 'CLOSED':
        return t('SOURCING.STATUS.CLOSED');
      case 'CANCELLED':
        return t('SOURCING.STATUS.CANCELLED');
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatPrice = (price: number | null) => {
    if (price === null) return t('SOURCING.PRICE_NEGOTIABLE');
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!mounted) return null;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">
            {t('SOURCING.MY_REQUESTS.TITLE')}
          </h1>
          <p className="text-sm text-neutral-500">
            {t('SOURCING.MY_REQUESTS.SUBTITLE')}
          </p>
        </div>
        <p className="text-sm text-neutral-500">
          {t('SOURCING.MY_REQUESTS.COUNT', { count: requests.length })}
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t('SOURCING.EMPTY.TITLE')}
          </h3>
          <p className="text-gray-500 mb-6"> {t('SOURCING.EMPTY.SUBTITLE')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {request.productName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {t('SOURCING.MY_REQUESTS.REQUEST_ID')}:#
                    {request.id.slice(-8)}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    request.status
                  )}`}
                >
                  {getStatusText(request.status)}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {t('SOURCING.MY_REQUESTS.QUANTITY')}:
                  </span>
                  <span className="font-medium">
                    {new Intl.NumberFormat('vi-VN').format(request.quantity)}{' '}
                    {t(`UNITS.${request.unit.toUpperCase()}`)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {t('SOURCING.MY_REQUESTS.EXPECTED_PRICE')}:
                  </span>
                  <span className="font-medium text-green-600">
                    {formatPrice(request.expectedPrice)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {t('SOURCING.MY_REQUESTS.DEADLINE')}:
                  </span>
                  <span className="font-medium">
                    {formatDate(request.deadline)}
                  </span>
                </div>

                {request.requirements && (
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {request.requirements}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>
                  {t('SOURCING.MY_REQUESTS.CREATED_AT')}:
                  {formatDate(request.createdAt)}
                </span>
                {request.updatedAt !== request.createdAt && (
                  <span>
                    {t('SOURCING.MY_REQUESTS.UPDATED_AT')}:
                    {formatDate(request.updatedAt)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
