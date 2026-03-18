export interface ChatRoom {
  id: string;
  bulkSaleId: string;
  productName: string;
  cooperativeId: string;
  cooperativeName: string;
  enterpriseId: string;
  enterpriseName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderType: 'ENTERPRISE' | 'COOPERATIVE' | 'SYSTEM';
  senderName: string;
  content: string;
  createdAt: string;
}
export interface AIContractSuggestion {
  price?: number;
  quantity?: number;
  confidence?: number;
}
