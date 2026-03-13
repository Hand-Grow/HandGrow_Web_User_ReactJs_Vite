export interface DraftContractData {
  roomId: string;
  bulkSaleId: string;
  cooperativeId: string;
  enterpriseId: string;
  productName: string;
  quantity: string;
  unitPrice: string;
  deliveryDate: string;
  deliveryLocation: string;
  aiGenerated: boolean;
}

export interface CreateContractPayload {
  roomId: string;
  agreedQuantity: number;
  agreedPrice: number;
  deliveryDate: string;
  terms?: string;
  deliveryLocation?: string;
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
  documentUrl: string;

  status: 'DRAFT' | 'PENDING' | 'ACTIVE' | 'COMPLETED';

  createdAt: string;
  updatedAt: string;
}
export const statusConfigContract = {
  DRAFT: {
    label: 'Bản nháp',
    color: 'bg-gray-100 text-gray-700',
  },
  PENDING: {
    label: 'Chờ duyệt',
    color: 'bg-orange-100 text-orange-700',
  },
  ACTIVE: {
    label: 'Đang hiệu lực',
    color: 'bg-green-100 text-green-700',
  },
  COMPLETED: {
    label: 'Hoàn thành',
    color: 'bg-blue-100 text-blue-700',
  },
};
