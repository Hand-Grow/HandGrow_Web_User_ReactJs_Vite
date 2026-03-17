import { API_ENDPOINTS } from '@/src/constants';
import httpClient from '@/src/services/http/httpClient';
import {
  Contract,
  CreateContractPayload,
  DraftContractData,
} from '@/src/types';

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
  getMyContracts: async (): Promise<Contract[]> => {
    const res = await httpClient.get(API_ENDPOINTS.CONTRACTS.MY_CONTRACTS);
    return res.data;
  },
  signContract: (contractId: string) => {
    return httpClient.post(`${API_ENDPOINTS.CONTRACTS.SIGN(contractId)}`);
  },
};
