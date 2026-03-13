import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import httpClient from '../http/httpClient';
export const authApi = {
  login(payload) {
    return httpClient.post(API_ENDPOINTS.AUTH.LOGIN, payload);
  },

  registerCoop(payload) {
    return httpClient.post(API_ENDPOINTS.AUTH.REGISTER_COOP, payload);
  },

  registerEnterprise(payload) {
    return httpClient.post(API_ENDPOINTS.AUTH.REGISTER_ENTERPRISE, payload);
  },
};
