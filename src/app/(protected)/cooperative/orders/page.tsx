'use client';

import { useEffect, useState } from 'react';
import { Plus, ChevronRight } from 'lucide-react';

import MainLayout from '@/src/components/layout/MainLayout';
import { statusConfigContract, Contract } from '@/src/types';
import { contractAPI } from '@/src/services/contract/aiContractService';

export default function OrdersPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      const data = await contractAPI.getMyContracts();
      setContracts(data);
    } catch (error) {
      console.error('Load contracts failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hợp đồng HTX</h1>
            <p className="text-gray-600 mt-1">
              Quản lý tất cả các hợp đồng mua bán nông sản
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
          >
            <Plus className="w-5 h-5" />
            Tạo hợp đồng
          </button>
        </div>

        {/* LIST */}
        <div className="space-y-3">
          {loading && <p>Đang tải...</p>}

          {!loading && contracts.length === 0 && (
            <p className="text-gray-500">Chưa có hợp đồng nào</p>
          )}

          {contracts.map((contract) => (
            <div
              key={contract.id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:border-green-400 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-gray-900">
                      {contract.productName}
                    </h3>

                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        statusConfigContract[contract.status].color
                      }`}
                    >
                      {statusConfigContract[contract.status].label}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-1">{contract.terms}</p>
                </div>

                <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <p className="text-gray-500">Doanh nghiệp</p>
                  <p className="font-medium text-gray-900">
                    {contract.enterpriseName}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Sản lượng</p>
                  <p className="font-medium text-gray-900">
                    {contract.agreedQuantity} kg
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Giá thỏa thuận</p>
                  <p className="font-medium text-gray-900">
                    {contract.agreedPrice.toLocaleString()} đ
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Ngày giao</p>
                  <p className="font-medium text-gray-900">
                    {new Date(contract.deliveryDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
