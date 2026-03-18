'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Package, FileText } from 'lucide-react';
import { toast } from 'react-toastify';
import sourcingApi from '@/src/services/sourcing/sourcingApi';
import { CreateSourcingRequestForm } from '@/src/services/sourcing/types';
import { Button } from '@/src/components/ui/button';

export default function SourcingHeader() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateSourcingRequestForm>({
    productName: '',
    quantity: '',
    unit: 'kg',
    expectedPrice: '',
    deadline: '',
    requirements: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        console.error('Token parse error:', e);
      }
    }
  }, []);

  const handleInputChange = (
    field: keyof CreateSourcingRequestForm,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.productName.trim()) {
      toast.error('Vui lòng nhập tên sản phẩm');
      return;
    }
    if (!formData.quantity.trim()) {
      toast.error('Vui lòng nhập số lượng');
      return;
    }
    if (!formData.deadline.trim()) {
      toast.error('Vui lòng chọn hạn chót');
      return;
    }

    const selectedDate = new Date(formData.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      toast.error('Hạn chót không thể là ngày đã qua');
      return;
    }

    try {
      setLoading(true);

      try {
        const profileResponse = await sourcingApi.testUserAccess();
        console.log('User profile access test response:', profileResponse);
      } catch (profileError) {
        toast.error(
          'Không thể truy cập thông tin user. Vui lòng đăng nhập lại.'
        );
        return;
      }

      const requestData = {
        productName: formData.productName.trim(),
        quantity: parseInt(formData.quantity),
        unit: formData.unit,
        expectedPrice: formData.expectedPrice
          ? parseInt(formData.expectedPrice)
          : null,
        deadline: formData.deadline,
        requirements: formData.requirements.trim() || null,
      };

      const response = await sourcingApi.create(requestData);

      toast.success('Tạo yêu cầu mua thành công!');

      setFormData({
        productName: '',
        quantity: '',
        unit: 'kg',
        expectedPrice: '',
        deadline: '',
        requirements: '',
      });

      setShowModal(false);

      window.location.reload();
    } catch (error: unknown) {
      const axiosError = error as {
        response?: {
          status?: number;
          data?: { message?: string };
        };
        message?: string;
      };

      if (axiosError.response?.status === 401) {
        toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      } else if (axiosError.response?.status === 403) {
        toast.error(
          'Bạn không có quyền tạo yêu cầu mua. Vui lòng liên hệ admin.'
        );
      } else if (axiosError.response?.status === 400) {
        const errorMessage =
          axiosError.response?.data?.message || 'Dữ liệu không hợp lệ';
        toast.error(errorMessage);
      } else if (
        axiosError.response?.status &&
        axiosError.response.status >= 500
      ) {
        toast.error('Lỗi server. Vui lòng thử lại sau.');
      } else {
        const errorMessage =
          axiosError.response?.data?.message ||
          axiosError.message ||
          'Tạo yêu cầu mua thất bại';
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
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

        <Button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4" />
          Tạo yêu cầu mua
        </Button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden m-4 flex flex-col">
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

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-6 overflow-y-auto flex-1"
            >
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
                  </select>
                </div>
              </div>

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
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

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

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Đang tạo...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      Tạo yêu cầu
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
