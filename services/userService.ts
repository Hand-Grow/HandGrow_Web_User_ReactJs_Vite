import { UserProfile } from '@/types/users';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import httpClient from './http/httpClient';

export const userService = {
  getProfile: async (): Promise<UserProfile> => {
    const res = await httpClient.get<UserProfile>(API_ENDPOINTS.USER.PROFILE);
    return res.data;
  },
};
