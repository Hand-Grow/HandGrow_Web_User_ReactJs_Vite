'use client';

import { useEffect, useState } from 'react';
import { Plus, ChevronRight, FileText } from 'lucide-react';

import MainLayout from '@/src/components/layout/MainLayout';
import { Contract, statusConfigContract, ContractStatus } from '@/src/types';
import { contractAPI } from '@/src/services/contract/aiContractService';
import { PRODUCE_LABELS, ProduceType } from '@/src/constants/produce';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const data = await contractAPI.getMyContracts();
      setContracts(data);
    } catch (_) {
      toast.error(t('ORDERS.ERROR_LOAD'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t('ORDERS.TITLE')}
            </h1>
            <p className="text-gray-600 mt-1">{t('ORDERS.SUBTITLE')}</p>
          </div>

          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
            <Plus className="w-5 h-5" />
            {t('ORDERS.CREATE')}
          </button>
        </div>

        <div className="space-y-3">
          {loading && <p className="text-gray-500">{t('ORDERS.LOADING')}</p>}
          {!loading && contracts.length === 0 && (
            <p className="text-gray-500">{t('ORDERS.EMPTY')}</p>
          )}
          {contracts.map((contract) => {
            const productLabel =
              PRODUCE_LABELS[contract.productName as ProduceType] ??
              contract.productName;
            const totalValue = contract.agreedPrice * contract.agreedQuantity;
            const statusConfig =
              statusConfigContract[contract.status as ContractStatus];
            return (
              <div
                key={contract.id}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:border-green-400 hover:shadow-md transition cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-gray-900">
                        {productLabel}
                      </h3>

                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${statusConfig.color}`}
                      >
                        {/* Hiển thị label đã dịch hoặc status gốc */}
                        {statusConfig.label === 'DRAFT'
                          ? t('ORDERS.STATUS.DRAFT')
                          : statusConfig.label === 'SAVED'
                            ? t('ORDERS.STATUS.SAVED')
                            : statusConfig.label}
                      </span>
                    </div>
                    {contract.terms && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {contract.terms}
                      </p>
                    )}
                  </div>

                  <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-3">
                  <div>
                    <p className="text-gray-500">{t('ORDERS.ENTERPRISE')}</p>
                    <p className="font-medium text-gray-900">
                      {contract.enterpriseName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">{t('ORDERS.COOPERATIVE')}</p>
                    <p className="font-medium text-gray-900">
                      {contract.cooperativeName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">{t('ORDERS.QUANTITY')}</p>
                    <p className="font-medium text-gray-900">
                      {contract.agreedQuantity.toLocaleString()} kg
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">{t('ORDERS.PRICE')}</p>
                    <p className="font-medium text-gray-900">
                      {contract.agreedPrice.toLocaleString()} đ
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">{t('ORDERS.TOTAL_VALUE')}</p>
                    <p className="font-semibold text-green-700">
                      {totalValue.toLocaleString()} đ
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">{t('ORDERS.DELIVERY_DATE')}</p>
                    <p className="font-medium text-gray-900">
                      {new Date(contract.deliveryDate).toLocaleDateString(
                        'vi-VN'
                      )}
                    </p>
                  </div>
                </div>
                {contract.documentUrl && (
                  <div className="border-t pt-3 flex items-center gap-2 text-sm text-blue-600">
                    <FileText className="w-4 h-4" />
                    <a
                      href={contract.documentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      {t('ORDERS.VIEW_DOCUMENT')}
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
