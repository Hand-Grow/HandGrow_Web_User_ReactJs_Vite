import { LoginCredentials } from '../context/auth/auth.types';
import { LoginResponse } from '../context/auth/jwt';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import httpClient from './http/httpClient';
import { UserProfile } from '@/src/types';

export const authService = {
  login: async (payload: LoginCredentials): Promise<LoginResponse> => {
    const res = await httpClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      payload
    );

    localStorage.setItem('accessToken', res.data.accessToken);
    localStorage.setItem('refreshToken', res.data.refreshToken);

    return res.data;
  },

  getProfile: async (): Promise<UserProfile> => {
    const res = await httpClient.get<UserProfile>(API_ENDPOINTS.USER.PROFILE);

    return res.data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
};
