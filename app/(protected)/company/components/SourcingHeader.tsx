'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Package, FileText } from 'lucide-react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import sourcingApi from '@/src/services/sourcing/sourcingApi';
import { CreateSourcingRequestForm } from '@/src/services/sourcing/types';
import { Button } from '@/src/components/ui/button';

export default function SourcingHeader() {
  const { t } = useTranslation();
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
      toast.error(t('SOURCING.FORM.VALIDATION.PRODUCT_NAME_REQUIRED'));
      return;
    }
    if (!formData.quantity.trim()) {
      toast.error(t('SOURCING.FORM.VALIDATION.QUANTITY_REQUIRED'));
      return;
    }
    if (!formData.deadline.trim()) {
      toast.error(t('SOURCING.FORM.VALIDATION.DEADLINE_REQUIRED'));
      return;
    }

    const selectedDate = new Date(formData.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      toast.error(t('SOURCING.FORM.VALIDATION.DEADLINE_PAST'));
      return;
    }

    try {
      setLoading(true);

      try {
        const profileResponse = await sourcingApi.testUserAccess();
        console.log('User profile access test response:', profileResponse);
      } catch (profileError) {
        toast.error(t('SOURCING.TOAST.ACCESS_ERROR'));
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

      toast.success(t('SOURCING.TOAST.CREATE_SUCCESS'));

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
        toast.error(t('SOURCING.TOAST.UNAUTHORIZED'));
      } else if (axiosError.response?.status === 403) {
        toast.error(t('SOURCING.TOAST.FORBIDDEN'));
      } else if (axiosError.response?.status === 400) {
        const errorMessage =
          axiosError.response?.data?.message ||
          t('SOURCING.TOAST.INVALID_DATA');
        toast.error(errorMessage);
      } else if (
        axiosError.response?.status &&
        axiosError.response.status >= 500
      ) {
        toast.error(t('SOURCING.TOAST.SERVER_ERROR'));
      } else {
        const errorMessage =
          axiosError.response?.data?.message ||
          axiosError.message ||
          t('SOURCING.TOAST.CREATE_FAILED');
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
          <h1 className="text-xl font-bold">{t('SOURCING.TITLE')}</h1>
          <p className="text-sm text-neutral-500">{t('SOURCING.SUBTITLE')}</p>
        </div>

        <Button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4" />
          {t('SOURCING.CREATE_BUTTON')}
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
                  <h2 className="text-lg font-bold">
                    {t('SOURCING.MODAL.TITLE')}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {t('SOURCING.MODAL.SUBTITLE')}
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
                  {t('SOURCING.FORM.PRODUCT_NAME')}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.productName}
                  onChange={(e) =>
                    handleInputChange('productName', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder={t('SOURCING.FORM.PRODUCT_NAME_PLACEHOLDER')}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('SOURCING.FORM.QUANTITY')}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.quantity}
                    onChange={(e) =>
                      handleInputChange('quantity', e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={t('SOURCING.FORM.QUANTITY_PLACEHOLDER')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('SOURCING.FORM.UNIT')}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="kg">{t('SOURCING.FORM.UNITS.KG')}</option>
                    <option value="tấn">{t('SOURCING.FORM.UNITS.TON')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('SOURCING.FORM.EXPECTED_PRICE')}
                </label>
                <input
                  type="number"
                  value={formData.expectedPrice}
                  onChange={(e) =>
                    handleInputChange('expectedPrice', e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder={t('SOURCING.FORM.EXPECTED_PRICE_PLACEHOLDER')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('SOURCING.FORM.DEADLINE')}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.deadline}
                  onChange={(e) =>
                    handleInputChange('deadline', e.target.value)
                  }
                  min={new Date().toISOString().split('SOURCING.T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('SOURCING.FORM.REQUIREMENTS')}
                </label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) =>
                    handleInputChange('requirements', e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder={t('SOURCING.FORM.REQUIREMENTS_PLACEHOLDER')}
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
                  {t('SOURCING.FORM.CANCEL')}
                </Button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {t('SOURCING.FORM.CREATING')}
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      {t('SOURCING.FORM.CREATE')}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
