import { useState, useEffect } from 'react';
import { DraftContractData, CreateContractPayload } from '@/src/types';
import { contractAPI } from '@/src/services/contract/aiContractService';
import { PRODUCE_LABELS, ProduceType } from '@/src/constants/produce';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import {
  FileText,
  Calendar,
  Package,
  DollarSign,
  CheckCircle,
} from 'lucide-react';
import axios, { AxiosError } from 'axios';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  draft: DraftContractData;
  onSaved: () => void;
}

interface ApiErrorResponse {
  error?: string;
  message?: string;
}

export default function ContractFormModal({
  isOpen,
  onClose,
  draft,
  onSaved,
}: Props) {
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);

  const { t } = useTranslation();

  const TERMS_CONTENT = [
    'Bên bán cam kết cung cấp đúng số lượng và chất lượng.',
    'Bên mua thanh toán đúng hạn theo thỏa thuận.',
    'Hai bên chịu trách nhiệm nếu vi phạm hợp đồng.',
  ];

  useEffect(() => {
    if (draft) {
      setQuantity(draft.agreedQuantity?.toString() || '');
      setPrice(draft.agreedPrice?.toString() || '');
      setDate(formatDisplayDate(draft.deliveryDate || ''));
      setIsAccepted(false);
    }
  }, [draft]);

  if (!isOpen) return null;

  // yyyy-MM-dd -> dd/MM/yyyy
  const formatDisplayDate = (value: string) => {
    if (!value) return '';
    const [y, m, d] = value.split('-');
    return `${d}/${m}/${y}`;
  };

  // dd/MM/yyyy -> yyyy-MM-dd
  const formatSubmitDate = (value: string) => {
    if (!value.includes('/')) return value;
    const [d, m, y] = value.split('/');
    return `${y}-${m}-${d}`;
  };

  const handleSave = async () => {
    if (!isAccepted) {
      toast.error('Bạn phải đồng ý với điều khoản');
      return;
    }

    try {
      const payload: CreateContractPayload = {
        roomId: draft.roomId,
        agreedQuantity: Number(quantity),
        agreedPrice: Number(price),
        deliveryDate: formatSubmitDate(date),
        terms: TERMS_CONTENT.join('\n'),
      };

      await contractAPI.saveContract(payload);

      toast.success('Tạo hợp đồng thành công');
      onSaved();
      onClose();
    } catch (err: unknown) {
      let message = 'Tạo hợp đồng thất bại';

      if (axios.isAxiosError<ApiErrorResponse>(err)) {
        message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      if (message.includes('Hợp đồng cho phòng chat này đã tồn tại')) {
        toast.error('Hợp đồng đã tồn Hợp đồng cho phòng chat này đã tồn tại');
        return;
      }

      toast.error(message);
    }
  };

  const productLabel =
    PRODUCE_LABELS[draft.productName as ProduceType] ?? draft.productName;

  const totalValue = Number(quantity || 0) * Number(price || 0);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[920px] max-w-[95vw] rounded-2xl p-6 space-y-6 shadow-xl">
        {/* HEADER */}
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-600" />
          {t('CHAT.CREATE_CONTRACT')}
        </h2>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-5">
          {/* PRODUCT */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-1">
              <Package size={14} /> {t('CHAT.PRODUCT')}
            </label>
            <input
              value={productLabel}
              disabled
              className="border rounded-lg p-2 w-full bg-gray-100"
            />
          </div>

          {/* DATE */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-1">
              <Calendar size={14} /> {t('CHAT.DELIVERY_DATE')}
            </label>
            <input
              type="text"
              placeholder="dd/MM/yyyy"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => {
                e.target.type = 'text';
                setDate(formatDisplayDate(e.target.value));
              }}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          {/* QUANTITY */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-1">
              <Package size={14} /> {t('CHAT.QUANTITY')}
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value.replace(/\D/g, ''))}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-1">
              <DollarSign size={14} /> {t('CHAT.PRICE')}
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={price}
              onChange={(e) => setPrice(e.target.value.replace(/\D/g, ''))}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          {/* TOTAL */}
          <div className="col-span-2 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-4">
            <p className="text-sm text-gray-600">{t('CHAT.TOTAL_VALUE')}</p>
            <p className="text-xl font-bold text-emerald-700">
              {totalValue.toLocaleString()} {t('CHAT.CURRENCY')}
            </p>
          </div>

          {/* TERMS */}
          <div className="col-span-2 border rounded-xl p-4 bg-gray-50">
            <p className="font-medium mb-2 flex items-center gap-2 text-gray-700">
              <FileText size={16} /> Điều khoản hợp đồng
            </p>

            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              {TERMS_CONTENT.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                checked={isAccepted}
                onChange={(e) => setIsAccepted(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm flex items-center gap-1 text-gray-700">
                <CheckCircle size={14} className="text-emerald-600" />
                Tôi đồng ý với các điều khoản
              </span>
            </div>
          </div>
        </div>

        {/* ACTION */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            {t('CHAT.CANCEL')}
          </button>

          <button
            onClick={handleSave}
            disabled={!isAccepted}
            className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
          >
            {t('CHAT.SAVE')}
          </button>
        </div>
      </div>
    </div>
  );
}
