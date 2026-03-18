import { API_ENDPOINTS } from '@/src/constants/apiEndpoints';
import axios from 'axios';
export const locationApi = {
  getProvinces() {
    return axios.get(API_ENDPOINTS.LOCATION.PROVINCES);
  },

  getProvinceDetail(code) {
    return axios.get(API_ENDPOINTS.LOCATION.PROVINCE_DETAIL(code));
  },
};
