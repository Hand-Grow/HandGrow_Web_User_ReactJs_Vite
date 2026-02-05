import { LoginCredentials } from '../context/auth/auth.types';
import { LoginResponse } from '../context/auth/jwt';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import httpClient from './http/httpClient';

export const authService = {
  login: async (payload: LoginCredentials): Promise<LoginResponse> => {
    const res = await httpClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      payload
    );
    return res.data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
};
