'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { feedService } from '@/services/feedService';
import { fileService } from '@/services/fileService';

interface Props {
  campaignId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PublishCampaignModal({
  campaignId,
  onClose,
  onSuccess,
}: Props) {
  const [expectedPrice, setExpectedPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      const file = files[0];
      const url = await fileService.uploadFile(file);
      setAttachments((prev) => [...prev, url]);
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setUploading(false);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePublish = async () => {
    if (!expectedPrice) return;

    try {
      setLoading(true);

      await feedService.publishCampaign(
        campaignId,
        Number(expectedPrice),
        attachments
      );

      onSuccess();
      onClose();
    } catch (err) {
      console.error('Publish failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-2xl p-6 space-y-5 shadow-xl animate-in fade-in zoom-in">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">Đăng lên Marketplace</h2>

          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500 font-medium">
            Giá dự kiến (VND)
          </label>

          <input
            type="number"
            value={expectedPrice}
            onChange={(e) => setExpectedPrice(e.target.value)}
            placeholder="150000"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none transition"
          />
        </div>

        {/* Attachments */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-500 font-medium">
              Ảnh sản phẩm (Tùy chọn)
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
              Thêm ảnh
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          {attachments.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {attachments.map((url, i) => (
                <div key={i} className="relative w-24 h-24 shrink-0">
                  <img
                    src={url}
                    alt="upload"
                    className="w-full h-full object-cover rounded-lg border shadow-sm"
                  />
                  <button
                    onClick={() => removeAttachment(i)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 shadow-md hover:bg-red-600 transition"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handlePublish}
          disabled={loading || uploading || !expectedPrice}
          className="w-full bg-green-600 text-white py-2.5 rounded-lg disabled:opacity-50 hover:bg-green-700 transition font-medium shadow-sm"
        >
          {loading ? 'Đang đăng...' : 'Đăng bài lên Marketplace'}
        </button>
      </div>
    </div>
  );
}
