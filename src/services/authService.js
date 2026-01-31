import { jwtDecode } from 'jwt-decode';
import { authApi } from './auth/authApi';

export const authService = {
  async login({ email, password }) {
    const { data } = await authApi.login({ username: email, password });

    if (!data?.accessToken) {
      throw new Error('Không nhận được accessToken');
    }

    const decoded = jwtDecode(data.accessToken);

    const user = {
      email: decoded.sub,
      role: decoded.role,
    };

    if (!user.role) {
      throw new Error('JWT không chứa role');
    }

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken || '');
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  },

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    if (!user || user === 'undefined') return null;
    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  },
};
