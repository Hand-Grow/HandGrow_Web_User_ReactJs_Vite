export type ContractStatus =
  | 'PENDING_ENTERPRISE_SIGNATURE'
  | 'PENDING_COOPERATIVE_SIGNATURE'
  | 'SIGNED'
  | 'CANCELLED'
  | 'DRAFT'
  | 'EXPIRED';
export interface DraftContractData {
  id?: string;
  roomId: string;
  bulkSaleId: string;
  cooperativeId: string;
  cooperativeName?: string;
  enterpriseId: string;
  enterpriseName?: string;
  productName: string;
  agreedQuantity: number;
  agreedPrice: number;
  deliveryDate: string;
  terms?: string;
  status?: ContractStatus;
  createdAt?: string;
  updatedAt?: string;
  aiGenerated?: boolean;
}
export interface CreateContractPayload {
  roomId: string;
  agreedQuantity: number;
  agreedPrice: number;
  deliveryDate: string;
  terms?: string;
}
export interface Contract {
  id: string;
  roomId: string;
  bulkSaleId: string;
  productName: string;

  cooperativeId: string;
  cooperativeName: string;

  enterpriseId: string;
  enterpriseName: string;

  agreedPrice: number;
  agreedQuantity: number;
  deliveryDate: string;
  terms: string;
  documentUrl: string | null;
  status: ContractStatus;
  createdAt: string;
  updatedAt: string;
}
export const statusConfigContract: Record<
  ContractStatus,
  { label: string; color: string }
> = {
  PENDING_ENTERPRISE_SIGNATURE: {
    label: 'Chờ doanh nghiệp ký',
    color: 'bg-yellow-100 text-yellow-700',
  },
  PENDING_COOPERATIVE_SIGNATURE: {
    label: 'Chờ HTX ký',
    color: 'bg-yellow-100 text-yellow-700',
  },
  SIGNED: {
    label: 'Đã ký',
    color: 'bg-green-100 text-green-700',
  },
  CANCELLED: {
    label: 'Đã hủy',
    color: 'bg-red-100 text-red-700',
  },
  DRAFT: {
    label: 'Bản nháp',
    color: 'bg-gray-100 text-gray-700',
  },
  EXPIRED: {
    label: 'Hết hạn',
    color: 'bg-orange-100 text-orange-700',
  },
};
