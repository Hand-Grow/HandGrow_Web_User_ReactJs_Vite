'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { feedService } from '@/services/feedService';

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

  const handlePublish = async () => {
    if (!expectedPrice) return;

    try {
      setLoading(true);

      await feedService.publishCampaign(campaignId, Number(expectedPrice));

      onSuccess();
      onClose();
    } catch (err) {
      console.error('Publish failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Đăng lên Marketplace</h2>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500">Giá dự kiến (VND)</label>

          <input
            type="number"
            value={expectedPrice}
            onChange={(e) => setExpectedPrice(e.target.value)}
            placeholder="150000"
            className="w-full border rounded-lg p-2"
          />
        </div>

        <button
          onClick={handlePublish}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? 'Đang đăng...' : 'Đăng lên B2B'}
        </button>
      </div>
    </div>
  );
}
