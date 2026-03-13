import { API_ENDPOINTS } from '@/constants';
import httpClient from '@/services/http/httpClient';
import { CreateContractPayload, DraftContractData } from '@/src/types';

export const contractAPI = {
  aiDraftContract(roomId: string) {
    return httpClient.post<DraftContractData>(
      API_ENDPOINTS.CONTRACTS.AI_DRAFT(roomId),
      {}
    );
  },

  saveContract(payload: CreateContractPayload) {
    return httpClient.post(API_ENDPOINTS.CONTRACTS.SAVE, payload);
  },

  getContractByRoom(roomId: string) {
    return httpClient.get(API_ENDPOINTS.CONTRACTS.BY_ROOM(roomId));
  },
};
