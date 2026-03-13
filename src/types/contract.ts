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
