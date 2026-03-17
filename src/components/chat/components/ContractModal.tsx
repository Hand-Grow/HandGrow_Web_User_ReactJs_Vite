import { useState, useEffect } from 'react';
import { DraftContractData, CreateContractPayload } from '@/src/types';
import { contractAPI } from '@/src/services/contract/aiContractService';
import { PRODUCE_LABELS, ProduceType } from '@/src/constants/produce';
import { useTranslation } from 'react-i18next';

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
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [date, setDate] = useState('');
  const [terms, setTerms] = useState('');
  const { t } = useTranslation();
  useEffect(() => {
    if (draft) {
      setQuantity(draft.agreedQuantity || 0);
      setPrice(draft.agreedPrice || 0);
      setDate(draft.deliveryDate || '');
      setTerms(draft.terms || '');
    }
  }, [draft]);

  if (!isOpen) return null;

  const handleSave = async () => {
    const payload: CreateContractPayload = {
      roomId: draft.roomId,
      agreedQuantity: quantity,
      agreedPrice: price,
      deliveryDate: date,
      terms,
    };

    await contractAPI.saveContract(payload);

    onSaved();
    onClose();
  };

  const productLabel =
    PRODUCE_LABELS[draft.productName as ProduceType] ?? draft.productName;

  const totalValue = quantity * price;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-225 max-w-[95vw] rounded-xl p-6 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            {t('CHAT.CREATE_CONTRACT')}
            {draft.aiGenerated && (
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                {t('CHAT.AI_DRAFTING')}
              </span>
            )}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">{t('CHAT.PRODUCT')}</label>
            <input
              value={productLabel}
              disabled
              className="border rounded p-2 w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              {t('CHAT.DELIVERY_DATE')}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">
              {t('CHAT.QUANTITY')}
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded p-2 w-full"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">{t('CHAT.PRICE')}</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="col-span-2 bg-green-50 border border-green-200 rounded p-3">
            <p className="text-sm text-gray-600">{t('CHAT.TOTAL_VALUE')}</p>
            <p className="text-lg font-semibold text-green-700">
              {totalValue.toLocaleString()} {t('CHAT.CURRENCY')}
            </p>
          </div>

          <div className="col-span-2">
            <label className="text-sm text-gray-600">{t('CHAT.TERMS')}</label>
            <textarea
              rows={4}
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              className="border rounded p-2 w-full"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            {t('CHAT.CANCEL')}
          </button>

          <button
            onClick={handleSave}
            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          >
            {t('CHAT.SAVE')}
          </button>
        </div>
      </div>
    </div>
  );
}
