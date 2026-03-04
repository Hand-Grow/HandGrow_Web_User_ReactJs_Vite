import axios from 'axios';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    if (token && config.headers && !config.url?.includes('/auth/login')) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    return Promise.reject(error);
  }
);

export default httpClient;
