import { useState } from 'react';
import { DraftContractData, CreateContractPayload } from '@/src/types';
import { contractAPI } from '@/src/services/contract/aiContractService';
import { PRODUCE_LABELS, ProduceType } from '@/src/constants/produce';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  draft: DraftContractData;
  onSaved: () => void;
}

export default function ContractFormModal({
  isOpen,
  onClose,
  draft,
  onSaved,
}: Props) {
  const [quantity, setQuantity] = useState(draft.quantity);
  const [price, setPrice] = useState(draft.unitPrice);
  const [date, setDate] = useState(draft.deliveryDate);
  const [location, setLocation] = useState(draft.deliveryLocation);
  const [terms, setTerms] = useState('');

  if (!isOpen) return null;

  const handleSave = async () => {
    const payload: CreateContractPayload = {
      roomId: draft.roomId,
      agreedQuantity: Number(quantity),
      agreedPrice: Number(price),
      deliveryDate: date,
      deliveryLocation: location,
      terms,
    };

    await contractAPI.saveContract(payload);

    onSaved();
    onClose();
  };
  const productLabel =
    PRODUCE_LABELS[draft.productName as ProduceType] ?? draft.productName;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white w-130 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          Tạo hợp đồng
          {draft.aiGenerated && (
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
              ✨ AI Generated
            </span>
          )}
        </h2>

        <div>
          <label>Tên sản phẩm</label>
          <input
            value={productLabel}
            disabled
            className="border rounded p-2 w-full bg-neutral-100"
          />
        </div>

        <div>
          <label>Sản lượng (kg)</label>
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label>Đơn giá (VND/kg)</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label>Ngày giao</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label>Địa điểm giao</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label>Điều khoản thêm</label>
          <textarea
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Hủy</button>

          <button
            onClick={handleSave}
            className="bg-emerald-600 text-white px-4 py-2 rounded"
          >
            Tạo hợp đồng
          </button>
        </div>
      </div>
    </div>
  );
}
