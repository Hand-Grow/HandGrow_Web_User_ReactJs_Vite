import axios from 'axios';
import i18next from 'i18next';
import toast from 'react-hot-toast';

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      const isAuthRoute = config.url?.includes('/auth/');

      if (token && !isAuthRoute) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window === 'undefined') {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const message = error.response?.data?.message || 'Something went wrong';

    switch (status) {
      case 400:
        toast.error(message || 'Bad request');
        break;

      case 401:
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = `/login?lang=${i18next.language || 'vi'}`;
        break;

      case 403:
        toast.error('You do not have permission');
        break;

      case 404:
        toast.error('Resource not found');
        break;

      case 500:
        toast.error('Server error. Please try again later');
        break;

      default:
        toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default httpClient;
