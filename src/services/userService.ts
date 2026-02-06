import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { UserProfile } from '../types/users';
import httpClient from './http/httpClient';

export const userService = {
  getProfile: async (): Promise<UserProfile> => {
    const res = await httpClient.get<UserProfile>(API_ENDPOINTS.USER.PROFILE);
    return res.data;
  },
};
