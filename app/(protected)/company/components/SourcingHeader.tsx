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

  const [errors, setErrors] = useState({
    productName: '',
    quantity: '',
    expectedPrice: '',
    deadline: '',
  });

  const [touched, setTouched] = useState({
    productName: false,
    quantity: false,
    expectedPrice: false,
    deadline: false,
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

  const MAX_QUANTITY = 1_000_000;
  const MAX_PRICE = 1_000_000_000;

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'productName': {
        if (!value.trim())
          return t('SOURCING.FORM.VALIDATION.PRODUCT_NAME_REQUIRED');
        return '';
      }

      case 'quantity': {
        if (!value.trim())
          return t('SOURCING.FORM.VALIDATION.QUANTITY_REQUIRED');

        const quantityNum = Number(value);
        if (isNaN(quantityNum) || quantityNum <= 0) {
          return t('SOURCING.FORM.VALIDATION.QUANTITY_INVALID');
        }
        if (quantityNum > MAX_QUANTITY) {
          return t('SOURCING.FORM.VALIDATION.QUANTITY_TOO_LARGE', {
            max: MAX_QUANTITY.toLocaleString('vi-VN'),
          });
        }
        return '';
      }

      case 'expectedPrice': {
        if (!value) return '';

        const priceNum = Number(value);
        if (isNaN(priceNum)) {
          return t('SOURCING.FORM.VALIDATION.PRICE_INVALID');
        }
        if (priceNum < 0) {
          return t('SOURCING.FORM.VALIDATION.PRICE_NEGATIVE');
        }
        if (priceNum > MAX_PRICE) {
          return t('SOURCING.FORM.VALIDATION.PRICE_TOO_LARGE', {
            max: MAX_PRICE.toLocaleString('vi-VN'),
          });
        }
        return '';
      }

      case 'deadline': {
        // CHỈ CHECK CÓ NHẬP HAY KHÔNG, KHÔNG CHECK FORMAT
        if (!value) return t('SOURCING.FORM.VALIDATION.DEADLINE_REQUIRED');
        return ''; // Có nhập là được, không check gì thêm
      }

      default:
        return '';
    }
  };

  const handleInputChange = (
    field: keyof CreateSourcingRequestForm,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    const error = validateField(field, value);
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    const value = formData[field as keyof CreateSourcingRequestForm] as string;
    const error = validateField(field, value);
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors = {
      productName: validateField('productName', formData.productName),
      quantity: validateField('quantity', formData.quantity),
      expectedPrice: validateField('expectedPrice', formData.expectedPrice),
      deadline: validateField('deadline', formData.deadline),
    };

    setErrors(newErrors);
    setTouched({
      productName: true,
      quantity: true,
      expectedPrice: true,
      deadline: true,
    });

    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = Object.values(errors).find((error) => error !== '');
      if (firstError) {
        toast.error(firstError);
      }
      return;
    }

    try {
      setLoading(true);

      const requestData = {
        productName: formData.productName.trim(),
        quantity: Number(formData.quantity),
        unit: formData.unit,
        expectedPrice: formData.expectedPrice
          ? Number(formData.expectedPrice)
          : null,
        deadline: formData.deadline,
        requirements: formData.requirements.trim() || null,
      };

      await sourcingApi.create(requestData);

      toast.success(t('SOURCING.TOAST.CREATE_SUCCESS'));

      setFormData({
        productName: '',
        quantity: '',
        unit: 'kg',
        expectedPrice: '',
        deadline: '',
        requirements: '',
      });
      setErrors({
        productName: '',
        quantity: '',
        expectedPrice: '',
        deadline: '',
      });
      setTouched({
        productName: false,
        quantity: false,
        expectedPrice: false,
        deadline: false,
      });
      setShowModal(false);

      window.location.reload();
    } catch (error: unknown) {
      // ... error handling
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
          <Plus className="w-4 h-4 mr-2" />
          {t('SOURCING.CREATE_BUTTON')}
        </Button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden m-4 flex flex-col">
            {/* Header */}
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
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('SOURCING.FORM.PRODUCT_NAME')}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) =>
                    handleInputChange('productName', e.target.value)
                  }
                  onBlur={() => handleBlur('productName')}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    touched.productName && errors.productName
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder={t('SOURCING.FORM.PRODUCT_NAME_PLACEHOLDER')}
                />
                {touched.productName && errors.productName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.productName}
                  </p>
                )}
              </div>

              {/* Quantity and Unit */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('SOURCING.FORM.QUANTITY')}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={formData.quantity}
                    onChange={(e) =>
                      handleInputChange('quantity', e.target.value)
                    }
                    onBlur={() => handleBlur('quantity')}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      touched.quantity && errors.quantity
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                    placeholder={t('SOURCING.FORM.QUANTITY_PLACEHOLDER')}
                  />
                  {touched.quantity && errors.quantity && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.quantity}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('SOURCING.FORM.UNIT')}
                    <span className="text-red-500 ml-1">*</span>
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

              {/* Expected Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('SOURCING.FORM.EXPECTED_PRICE')}
                </label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={formData.expectedPrice}
                  onChange={(e) =>
                    handleInputChange('expectedPrice', e.target.value)
                  }
                  onBlur={() => handleBlur('expectedPrice')}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    touched.expectedPrice && errors.expectedPrice
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder={t('SOURCING.FORM.EXPECTED_PRICE_PLACEHOLDER')}
                />
                {touched.expectedPrice && errors.expectedPrice && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.expectedPrice}
                  </p>
                )}
              </div>

              {/* Deadline - CHỈ CẦN NHẬP LÀ ĐƯỢC */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('SOURCING.FORM.DEADLINE')}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) =>
                    handleInputChange('deadline', e.target.value)
                  }
                  onBlur={() => handleBlur('deadline')}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    touched.deadline && errors.deadline
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                />
                {touched.deadline && errors.deadline && (
                  <p className="mt-1 text-sm text-red-500">{errors.deadline}</p>
                )}
              </div>

              {/* Requirements */}
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

              {/* Actions */}
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
                <Button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {t('SOURCING.FORM.CREATING')}
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      {t('SOURCING.FORM.CREATE')}
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
