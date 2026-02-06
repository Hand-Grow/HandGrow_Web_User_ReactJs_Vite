export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER_COOP: '/api/v1/auth/register/coop',
    REGISTER_ENTERPRISE: '/api/v1/auth/register/enterprise',
  },

  JOIN_REQUEST: {
    BY_STATUS: (status: 'PENDING' | 'APPROVED' | 'REJECTED') =>
      `/api/v1/join-requests/status/${status}`,
    ALL_REQUEST: '/api/v1/join-requests/all',
    RESPOND: (requestId: string) =>
      `/api/v1/join-requests/${requestId}/respond`,
  },

  USER: {
    PROFILE: '/api/v1/user/profile',
  },
};
