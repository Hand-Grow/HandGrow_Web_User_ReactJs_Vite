'use client';

import React, { useState } from 'react';
import { X, Plus, Package, FileText } from 'lucide-react';

interface FormData {
  productName: string;
  quantity: string;
  unit: string;
  expectedPrice: string;
  deadline: string;
  requirements: string;
}

export default function SourcingHeader() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    productName: '',
    quantity: '',
    unit: 'kg',
    expectedPrice: '',
    deadline: '',
    requirements: '',
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // TODO: Gửi API để tạo yêu cầu mua
    setShowModal(false);
    setFormData({
      productName: '',
      quantity: '',
      unit: 'kg',
      expectedPrice: '',
      deadline: '',
      requirements: '',
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Tìm kiếm nguồn cung</h1>
          <p className="text-sm text-neutral-500">
            Khám phá các nguồn nông sản chất lượng
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Tạo yêu cầu mua
        </button>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Tạo yêu cầu mua mới</h2>
                  <p className="text-sm text-gray-500">
                    Điền thông tin chi tiết về yêu cầu của bạn
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Tên sản phẩm */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên sản phẩm <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.productName}
                  onChange={(e) =>
                    handleInputChange('productName', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ví dụ: Cà phê Arabica"
                />
              </div>

              {/* Số lượng và Đơn vị */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số lượng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.quantity}
                    onChange={(e) =>
                      handleInputChange('quantity', e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Đơn vị <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="kg">Kg</option>
                    <option value="tấn">Tấn</option>
                    <option value="cái">Cái</option>
                    <option value="thùng">Thùng</option>
                    <option value="bao">Bao</option>
                  </select>
                </div>
              </div>

              {/* Giá dự kiến */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá dự kiến (VNĐ)
                </label>
                <input
                  type="number"
                  value={formData.expectedPrice}
                  onChange={(e) =>
                    handleInputChange('expectedPrice', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="50000"
                />
              </div>

              {/* Hạn chót */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hạn chót <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.deadline}
                  onChange={(e) =>
                    handleInputChange('deadline', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Yêu cầu thêm */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yêu cầu thêm
                </label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) =>
                    handleInputChange('requirements', e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Nhập các yêu cầu cụ thể về chất lượng, quy cách, thời gian giao hàng..."
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Tạo yêu cầu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
