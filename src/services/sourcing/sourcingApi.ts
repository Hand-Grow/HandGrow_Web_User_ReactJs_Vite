import httpClient from '../../../services/http/httpClient';
import {
  SourcingRequest,
  SourcingRequestResponse,
  ApiResponse,
  PaginatedResponse,
  SearchParams,
  SimpleResponse,
} from './types';

const sourcingApi = {
  getAll: async (
    params = {}
  ): Promise<ApiResponse<PaginatedResponse<SourcingRequestResponse>>> => {
    try {
      const response = await httpClient.get('/api/v1/sourcing-requests', {
        params,
      });
      return response;
    } catch (error) {
      console.error('Error fetching requests:', error);
      throw error;
    }
  },

  getMyRequests: async (): Promise<
    ApiResponse<PaginatedResponse<SourcingRequestResponse>>
  > => {
    try {
      const response = await httpClient.get('/api/v1/sourcing-requests/my');
      return response;
    } catch (error) {
      console.error('Error fetching my requests:', error);
      throw error;
    }
  },

  getOpenRequests: async (): Promise<
    ApiResponse<PaginatedResponse<SourcingRequestResponse>>
  > => {
    try {
      const response = await httpClient.get('/api/v1/sourcing-requests/open');
      return response;
    } catch (error) {
      console.error('Error fetching open requests:', error);
      throw error;
    }
  },

  search: async (
    params: SearchParams
  ): Promise<ApiResponse<PaginatedResponse<SourcingRequestResponse>>> => {
    try {
      const response = await httpClient.get(
        '/api/v1/sourcing-requests/search',
        {
          params,
        }
      );
      return response;
    } catch (error) {
      console.error('Error searching requests:', error);
      throw error;
    }
  },

  testUserAccess: async (): Promise<
    ApiResponse<{ username: string; email: string; role: string }>
  > => {
    try {
      const response = await httpClient.get('/api/v1/user/profile');
      return response;
    } catch (error) {
      console.error('User profile access failed:', error);
      throw error;
    }
  },

  testPublicAPI: async (): Promise<
    ApiResponse<PaginatedResponse<SourcingRequestResponse>>
  > => {
    try {
      const response = await httpClient.get('/api/v1/sourcing-requests');
      return response;
    } catch (error) {
      console.error('Public API failed:', error);
      throw error;
    }
  },
  create: async (
    requestData: SourcingRequest
  ): Promise<ApiResponse<string>> => {
    try {
      const token = localStorage.getItem('accessToken');

      const response = await httpClient.post(
        '/api/v1/sourcing-requests',
        requestData
      );
      return response;
    } catch (error: unknown) {
      console.error('Error creating request:', error);

      const axiosError = error as {
        config?: {
          url?: string;
          data?: SourcingRequest;
        };
        response?: {
          status?: number;
          data?: { message?: string };
        };
        message?: string;
      };

      if (axiosError.response?.status === 403) {
        axiosError.message = 'Bạn không có quyền tạo yêu cầu mua.';
      }

      throw error;
    }
  },

  getById: async (
    id: string
  ): Promise<ApiResponse<SourcingRequestResponse>> => {
    try {
      const response = await httpClient.get(`/api/v1/sourcing-requests/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching request detail:', error);
      throw error;
    }
  },

  cancel: async (id: string): Promise<ApiResponse<SimpleResponse>> => {
    try {
      const response = await httpClient.put(
        `/api/v1/sourcing-requests/${id}/cancel`
      );
      return response;
    } catch (error) {
      console.error('Error canceling request:', error);
      throw error;
    }
  },

  updateStatus: async (
    id: string,
    status: string
  ): Promise<ApiResponse<SimpleResponse>> => {
    try {
      const response = await httpClient.put(
        `/api/v1/sourcing-requests/${id}/status`,
        { status }
      );
      return response;
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  },
};

export default sourcingApi;
