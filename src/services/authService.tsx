// services/authService.ts
import axios from 'axios';
import { LoginCredentials } from '../context/auth/auth.types';
import { LoginResponse } from '../context/auth/jwt';

export const authService = {
  login: async (payload: LoginCredentials): Promise<LoginResponse> => {
    const res = await axios.post<LoginResponse>('/login', payload);
    return res.data;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
};
