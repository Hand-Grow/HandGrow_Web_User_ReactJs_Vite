import { API_ENDPOINTS } from '@/constants';
import httpClient from '@/services/http/httpClient';

export interface ContractExtractionRequest {
  roomId: string;
  messages: string[];
}

export interface ContractExtractionResponse {
  price?: number;
  quantity?: number;
  confidence?: number;
}

export const aiContractService = {
  extractContract(data: ContractExtractionRequest) {
    return httpClient.post<ContractExtractionResponse>(
      API_ENDPOINTS.AI.EXTRACT_CONTRACT,
      data
    );
  },
};
