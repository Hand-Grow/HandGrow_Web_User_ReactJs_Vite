'use client';

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { feedService } from '@/src/services/feedService';
import { fileService } from '@/src/services/fileService';
import { useTranslation } from 'react-i18next';

interface Props {
  campaignId: string;
  collectedQuantity: number;
  onClose: () => void;
  onSuccess: () => void;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

// 🔥 giới hạn giá (tuỳ business)
const MAX_PRICE = 1_000_000_000; // 1 tỷ

export default function PublishCampaignModal({
  campaignId,
  collectedQuantity,
  onClose,
  onSuccess,
}: Props) {
  const { t } = useTranslation();

  const [expectedPrice, setExpectedPrice] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ===== Upload =====
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    try {
      setUploading(true);
      const file = files[0];
      const url = await fileService.uploadFile(file);
      setAttachments((prev) => [...prev, url]);
    } catch {
      setError(t('MARKETPLACE.ERRORS.UPLOAD_FAILED'));
    } finally {
      setUploading(false);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  // ===== Validate realtime =====
  useEffect(() => {
    if (!expectedPrice) {
      setError(null);
      return;
    }

    const price = Number(expectedPrice);

    if (Number.isNaN(price)) {
      setError(t('MARKETPLACE.ERRORS.PRICE_INVALID'));
      return;
    }

    if (price <= 0) {
      setError(t('MARKETPLACE.ERRORS.PRICE_INVALID'));
      return;
    }

    if (price > MAX_PRICE) {
      setError(
        t('MARKETPLACE.ERRORS.PRICE_TOO_LARGE', {
          max: MAX_PRICE.toLocaleString(),
        })
      );
      return;
    }

    setError(null);
  }, [expectedPrice, t]);

  const validate = (): string | null => {
    const price = Number(expectedPrice);

    if (!expectedPrice) return t('MARKETPLACE.ERRORS.PRICE_REQUIRED');

    if (Number.isNaN(price) || price <= 0) {
      return t('MARKETPLACE.ERRORS.PRICE_INVALID');
    }

    if (price > MAX_PRICE) {
      return t('MARKETPLACE.ERRORS.PRICE_TOO_LARGE', {
        max: MAX_PRICE.toLocaleString(),
      });
    }

    // ✅ ĐÃ XÓA: Không còn check collectedQuantity <= 0

    return null;
  };

  // ===== Submit =====
  const handlePublish = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      await feedService.publishCampaign(
        campaignId,
        Number(expectedPrice),
        attachments
      );

      onSuccess();
      onClose();
    } catch (err: unknown) {
      const apiError = err as ApiError;

      setError(
        apiError?.response?.data?.message ||
          t('MARKETPLACE.ERRORS.PUBLISH_FAILED')
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ ĐÃ SỬA: Chỉ check price, không check collectedQuantity
  const isDisabled =
    loading ||
    uploading ||
    !expectedPrice ||
    Number(expectedPrice) <= 0 ||
    Number(expectedPrice) > MAX_PRICE;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-2xl p-6 space-y-6 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">
            {t('MARKETPLACE.PUBLISH.TITLE')}
          </h2>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Price */}
        <div className="space-y-1">
          <label className="text-sm text-gray-600 font-medium">
            {t('MARKETPLACE.PUBLISH.PRICE_LABEL')}
          </label>

          <div className="relative">
            <input
              type="number"
              value={expectedPrice}
              onChange={(e) => setExpectedPrice(e.target.value)}
              placeholder={t('MARKETPLACE.PUBLISH.PRICE_PLACEHOLDER')}
              className={`w-full border rounded-lg px-3 py-2 pr-10 outline-none transition
                ${error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-2 focus:ring-green-500'}
              `}
            />

            <span className="absolute right-3 top-2.5 text-sm text-gray-400">
              {t('COMMON.CURRENCY')}
            </span>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">
            {error}
          </div>
        )}

        {/* Attachments */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-600 font-medium">
              {t('MARKETPLACE.PUBLISH.ATTACHMENTS')}
            </label>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="text-xs text-green-600 flex items-center gap-1 hover:underline"
            >
              {uploading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <ImageIcon size={14} />
              )}
              {t('MARKETPLACE.PUBLISH.ADD_IMAGE')}
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              hidden
              accept="image/*"
            />
          </div>

          {attachments.length > 0 && (
            <div className="flex gap-2 overflow-x-auto">
              {attachments.map((url, i) => (
                <div
                  key={i}
                  className="relative w-24 h-24 rounded-lg overflow-hidden border"
                >
                  <img
                    src={url}
                    alt="upload"
                    className="w-full h-full object-cover"
                  />

                  <button
                    onClick={() => removeAttachment(i)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handlePublish}
          disabled={isDisabled}
          className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium 
                     hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}

          {loading
            ? t('MARKETPLACE.PUBLISH.LOADING')
            : t('MARKETPLACE.PUBLISH.SUBMIT')}
        </button>
      </div>
    </div>
  );
}
