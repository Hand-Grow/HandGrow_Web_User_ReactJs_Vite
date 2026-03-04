import axios from 'axios';
import { API_ENDPOINTS } from '../../constants/apiEndpoints';

export const locationApi = {
  getProvinces() {
    return axios.get(API_ENDPOINTS.LOCATION.PROVINCES);
  },

  getProvinceDetail(code) {
    return axios.get(API_ENDPOINTS.LOCATION.PROVINCE_DETAIL(code));
  },
};
