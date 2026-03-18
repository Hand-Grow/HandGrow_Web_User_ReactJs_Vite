// src/components/chat/MessageBubble.tsx
'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  PenSquare,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { PRODUCE_LABELS } from '@/src/constants/produce';
import { contractAPI } from '@/src/services/contract/aiContractService';
import toast from 'react-hot-toast';
import { UserRole } from '@/src/constants';

interface ContractData {
  id: string;
  productName: string;
  cooperativeName: string;
  enterpriseName: string;
  agreedPrice: number;
  agreedQuantity: number;
  deliveryDate: string;
  status: string;
  documentUrl?: string | null;
  cooperativeId: string;
  enterpriseId: string;
}

interface Props {
  text: string;
  mine?: boolean;
  time?: string;
  currentUserRole?: UserRole;
  currentUserId?: string;
  onContractSigned?: () => void;
}

export default function MessageBubble({
  text,
  mine,
  time,
  currentUserRole,
  currentUserId,
  onContractSigned,
}: Props) {
  const { t } = useTranslation();
  const [isSigning, setIsSigning] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price * 1000);
  };

  const formatQuantity = (quantity: number) => {
    return new Intl.NumberFormat('vi-VN').format(quantity) + ' kg';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getProductLabel = (productKey: string) => {
    if (productKey in PRODUCE_LABELS) {
      return PRODUCE_LABELS[productKey as keyof typeof PRODUCE_LABELS];
    }
    return productKey;
  };

  const canSignContract = (contract: ContractData) => {
    if (!currentUserRole || !currentUserId) return false;

    if (
      currentUserRole === 'COOP' &&
      contract.status === 'PENDING_COOPERATIVE_SIGNATURE' &&
      contract.cooperativeId === currentUserId
    ) {
      return true;
    }

    if (
      currentUserRole === 'ENTERPRISE' &&
      contract.status === 'PENDING_ENTERPRISE_SIGNATURE' &&
      contract.enterpriseId === currentUserId
    ) {
      return true;
    }

    return false;
  };

  const handleSignContract = async (contractId: string) => {
    try {
      setIsSigning(true);
      const toastId = toast.loading(
        t('CONTRACT.SIGNING') || 'Đang ký hợp đồng...'
      );

      await contractAPI.signContract(contractId);

      toast.dismiss(toastId);
      toast.success(t('CONTRACT.SIGN_SUCCESS') || 'Ký hợp đồng thành công!', {
        icon: '✍️',
      });

      onContractSigned?.();
    } catch (error) {
      console.error('Sign contract failed:', error);
      toast.error(t('CONTRACT.SIGN_ERROR') || 'Ký hợp đồng thất bại!');
    } finally {
      setIsSigning(false);
    }
  };

  try {
    const parsed = JSON.parse(text);
    if (parsed.type === 'CONTRACT' && parsed.contractData) {
      const contract = parsed.contractData;
      const canSign = canSignContract(contract);

      const getStatusBadge = () => {
        switch (contract.status) {
          case 'PENDING_ENTERPRISE_SIGNATURE':
            return {
              label: t('CONTRACT.STATUS.PENDING_ENTERPRISE'),
              color: 'bg-yellow-100 text-yellow-700',
              icon: <Clock className="w-3 h-3" />,
            };
          case 'PENDING_COOPERATIVE_SIGNATURE':
            return {
              label: t('CONTRACT.STATUS.PENDING_COOP'),
              color: 'bg-yellow-100 text-yellow-700',
              icon: <Clock className="w-3 h-3" />,
            };
          case 'SIGNED':
            return {
              label: t('CONTRACT.STATUS.SIGNED'),
              color: 'bg-green-100 text-green-700',
              icon: <CheckCircle className="w-3 h-3" />,
            };
          case 'CANCELLED':
            return {
              label: t('CONTRACT.STATUS.CANCELLED'),
              color: 'bg-red-100 text-red-700',
              icon: <AlertCircle className="w-3 h-3" />,
            };
          default:
            return {
              label: contract.status,
              color: 'bg-gray-100 text-gray-700',
              icon: <FileText className="w-3 h-3" />,
            };
        }
      };

      const status = getStatusBadge();

      return (
        <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
          <div className="max-w-md">
            <div
              className={`bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden ${
                mine ? 'ml-auto' : 'mr-auto'
              }`}
            >
              {/* Header */}
              <div className="bg-linear-to-r from-emerald-600 to-emerald-500 px-4 py-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-white" />
                  <h3 className="font-semibold text-white">
                    {t('CONTRACT.TITLE_CONTRACT')} #{contract.id.slice(0, 8)}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3">
                {/* Product */}
                <div>
                  <p className="text-xs text-neutral-500 mb-1">
                    {t('CONTRACT.PRODUCT')}
                  </p>
                  <p className="font-medium text-neutral-900">
                    {getProductLabel(contract.productName)}
                  </p>
                </div>

                {/* Parties */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">
                      {t('CONTRACT.COOP')}
                    </p>
                    <p className="text-sm font-medium text-neutral-900">
                      {contract.cooperativeName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">
                      {t('CONTRACT.ENTERPRISE')}
                    </p>
                    <p className="text-sm font-medium text-neutral-900">
                      {contract.enterpriseName}
                    </p>
                  </div>
                </div>

                {/* Price & Quantity */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">
                      {t('CONTRACT.PRICE')}
                    </p>
                    <p className="font-semibold text-emerald-600">
                      {formatPrice(contract.agreedPrice)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">
                      {t('CONTRACT.QUANTITY')}
                    </p>
                    <p className="font-semibold text-neutral-900">
                      {formatQuantity(contract.agreedQuantity)}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-neutral-500 mb-1">
                    {t('CONTRACT.DELIVERY_DATE')}
                  </p>
                  <p className="text-sm text-neutral-900">
                    {formatDate(contract.deliveryDate)}
                  </p>
                </div>

                <div className="pt-2">
                  <div
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${status.color}`}
                  >
                    {status.icon}
                    <span>{status.label}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-100 p-3 bg-neutral-50 space-y-2">
                <Link
                  href={`/contracts/${contract.id}`}
                  className="flex items-center justify-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  <span>{t('CONTRACT.VIEW_DETAILS')}</span>
                  <Download className="w-4 h-4" />
                </Link>

                {canSign && (
                  <button
                    onClick={() => handleSignContract(contract.id)}
                    disabled={isSigning}
                    className={`
                      w-full flex items-center justify-center gap-2 px-4 py-2 
                      rounded-lg text-sm font-medium transition-all
                      ${
                        isSigning
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }
                    `}
                  >
                    <PenSquare className="w-4 h-4" />
                    <span>
                      {isSigning
                        ? t('CONTRACT.SIGNING')
                        : t('CONTRACT.SIGN_BUTTON')}
                    </span>
                  </button>
                )}

                {contract.status === 'SIGNED' && (
                  <div className="flex items-center justify-center gap-1 text-xs text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    <span>{t('CONTRACT.SIGNED_COMPLETED')}</span>
                  </div>
                )}
              </div>
            </div>
            {time && (
              <p
                className={`text-[10px] mt-1 ${mine ? 'text-right' : 'text-left'} text-neutral-400`}
              >
                {time}
              </p>
            )}
          </div>
        </div>
      );
    }
  } catch (e) {
    // Không phải JSON, là text thường
  }

  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          px-4 py-3 rounded-2xl max-w-[65%] text-sm relative
          ${
            mine
              ? 'bg-emerald-600 text-white rounded-br-md'
              : 'bg-white shadow-sm rounded-bl-md'
          }
        `}
      >
        {text}

        {time && (
          <p
            className={`text-[10px] mt-1 text-right ${
              mine ? 'text-white/80' : 'text-neutral-400'
            }`}
          >
            {time}
          </p>
        )}
      </div>
    </div>
  );
}
