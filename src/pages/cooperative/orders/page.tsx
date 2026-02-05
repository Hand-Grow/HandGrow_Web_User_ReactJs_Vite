'use client';

import { useState } from 'react';
import { Plus, ChevronRight } from 'lucide-react';
import { MainLayout } from '../main-layout';

interface Contract {
  id: string;
  code: string;
  title: string;
  products: string[];
  date: string;
  status: 'active' | 'pending' | 'completed';
  value: string;
  description: string;
}

const mockContracts: Contract[] = [
  {
    id: '1',
    code: 'HĐ001',
    title: 'Hợp đồng mua bán nông sản',
    products: ['Phân bón lá 16-8-4', 'Lúa giống ST25'],
    date: 'Hôm nay - 15/01/2024',
    status: 'active',
    value: '150,000,000đ',
    description:
      'Hợp đồng mua bán phân bón và giống lúa giữa HTX và công ty cung cấp',
  },
  {
    id: '2',
    code: 'HĐ002',
    title: 'Hợp đồng cung cấp dịch vụ canh tác',
    products: ['Dịch vụ tư vấn', 'Hỗ trợ kỹ thuật'],
    date: '10/01/2024 - 10/06/2024',
    status: 'active',
    value: '50,000,000đ',
    description:
      'Hợp đồng cung cấp dịch vụ tư vấn và hỗ trợ kỹ thuật canh tác cho các thành viên',
  },
  {
    id: '3',
    code: 'HĐ003',
    title: 'Hợp đồng bán sản phẩm',
    products: ['Lúa thơm', 'Đậu tương'],
    date: '01/01/2024 - 31/12/2024',
    status: 'completed',
    value: '200,000,000đ',
    description: 'Hợp đồng bán sản phẩm lúa thơm và đậu tương cho các nhà buôn',
  },
];

const statusConfig = {
  active: { label: 'Đang hoạt động', color: 'bg-green-100 text-green-700' },
  pending: { label: 'Chờ duyệt', color: 'bg-orange-100 text-orange-700' },
  completed: { label: 'Hoàn thành', color: 'bg-gray-100 text-gray-700' },
};

export default function OrdersPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <MainLayout>
      <div className="space-y-6">
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

        <div className="space-y-3">
          {mockContracts.map((contract) => (
            <div
              key={contract.id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:border-green-400 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-gray-900">
                      {contract.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        statusConfig[contract.status].color
                      }`}
                    >
                      {statusConfig[contract.status].label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {contract.description}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <p className="text-gray-500">Mã hợp đồng</p>
                  <p className="font-medium text-gray-900">{contract.code}</p>
                </div>
                <div>
                  <p className="text-gray-500">Giá trị</p>
                  <p className="font-medium text-gray-900">{contract.value}</p>
                </div>
                <div>
                  <p className="text-gray-500">Thời gian</p>
                  <p className="font-medium text-gray-900">{contract.date}</p>
                </div>
                <div>
                  <p className="text-gray-500">Sản phẩm</p>
                  <p className="font-medium text-gray-900">
                    {contract.products.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showCreateModal && (
          <CreateContractModal onClose={() => setShowCreateModal(false)} />
        )}
      </div>
    </MainLayout>
  );
}

function CreateContractModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    product: '',
    startDate: '',
    endDate: '',
    value: '',
  });

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40 animate-in fade-in"
      />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto z-50 animate-in zoom-in-95 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Tạo hợp đồng mới</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên hợp đồng
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Nhập tên hợp đồng"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mã hợp đồng
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              placeholder="VD: HĐ001"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sản phẩm
            </label>
            <input
              type="text"
              value={formData.product}
              onChange={(e) =>
                setFormData({ ...formData, product: e.target.value })
              }
              placeholder="Nhập sản phẩm"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Từ ngày
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đến ngày
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giá trị hợp đồng
            </label>
            <input
              type="text"
              value={formData.value}
              onChange={(e) =>
                setFormData({ ...formData, value: e.target.value })
              }
              placeholder="VD: 150,000,000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Hủy
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Tạo hợp đồng
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
