import httpClient from '../http/httpClient';
import { API_ENDPOINTS } from '../../constants/apiEndpoints';

export const locationApi = {
  getProvinces() {
    return httpClient.get(API_ENDPOINTS.LOCATION.PROVINCES);
  },
  getProvinceDetail(code) {
    return httpClient.get(API_ENDPOINTS.LOCATION.PROVINCE_DETAIL(code));
  },
};
