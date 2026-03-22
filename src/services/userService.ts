import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { UserProfile, UpdateProfileRequest } from '../types';
import httpClient from './http/httpClient';

export const userService = {
  getProfile: async (): Promise<UserProfile> => {
    const res = await httpClient.get<UserProfile>(API_ENDPOINTS.USER.PROFILE);
    return res.data;
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<void> => {
    await httpClient.put(API_ENDPOINTS.USER.PROFILE, data);
  },
};
