import httpClient from '../http/httpClient';
import { API_ENDPOINTS } from '../../constants/apiEndpoints';

export const authApi = {
  login(payload) {
    console.log('API LOGIN PAYLOAD 👉', payload);
    return httpClient.post(API_ENDPOINTS.AUTH.LOGIN, payload);
  },

  registerCoop(payload) {
    return httpClient.post(API_ENDPOINTS.AUTH.REGISTER_COOP, payload);
  },

  registerEnterprise(payload) {
    return httpClient.post(API_ENDPOINTS.AUTH.REGISTER_ENTERPRISE, payload);
  },
};
