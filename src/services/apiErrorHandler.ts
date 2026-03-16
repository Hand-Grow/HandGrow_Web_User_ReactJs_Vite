import { AxiosError } from 'axios';

interface ApiErrorResponse {
  message?: string;
}

export const handleApiError = (error: AxiosError<ApiErrorResponse>) => {
  const status = error.response?.status;

  switch (status) {
    case 401:
      return 'Session expired';
    case 403:
      return 'Forbidden';
    case 404:
      return 'Not found';
    case 500:
      return 'Server error';
    default:
      return error.response?.data?.message || 'Unexpected error';
  }
};
