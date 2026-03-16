export type ContractStatus = 'DRAFT' | 'SAVED';
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
export const statusConfigContract = {
  DRAFT: {
    label: 'Bản nháp',
    color: 'bg-gray-100 text-gray-700',
  },
  SAVED: {
    label: 'Hoàn thành',
    color: 'bg-blue-100 text-blue-700',
  },
};
