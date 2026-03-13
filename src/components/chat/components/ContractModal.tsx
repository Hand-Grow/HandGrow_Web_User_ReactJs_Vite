import { useState, useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  aiData?: {
    price?: number;
    quantity?: number;
    confidence?: number;
  };
}

export default function ContractModal({ open, onClose, aiData }: Props) {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (aiData) {
      setPrice(aiData.price?.toString() || '');
      setQuantity(aiData.quantity?.toString() || '');
    }
  }, [aiData]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white w-125 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">Tạo hợp đồng</h2>

        <div>
          <label>Giá (VND/kg)</label>
          <input
            className="border rounded p-2 w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label>Số lượng (kg)</label>
          <input
            className="border rounded p-2 w-full"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Hủy</button>

          <button className="bg-emerald-600 text-white px-4 py-2 rounded">
            Tạo hợp đồng
          </button>
        </div>
      </div>
    </div>
  );
}
