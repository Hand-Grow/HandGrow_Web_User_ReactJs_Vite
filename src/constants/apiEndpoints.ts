export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER_COOP: '/api/v1/auth/register/coop',
    REGISTER_ENTERPRISE: '/api/v1/auth/register/enterprise',
  },

  LOCATION: {
    PROVINCES: 'https://provinces.open-api.vn/api/v2/p',
    PROVINCE_DETAIL: (code: number) =>
      `https://provinces.open-api.vn/api/v2/p/${code}?depth=2`,
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

  FEED: {
    GET_FEED: (coopId: string, page = 0, size = 10) =>
      `/api/v1/coops/${coopId}/feed?page=${page}&size=${size}`,

    TOGGLE_LIKE: (type: 'announcements' | 'campaigns', id: number) =>
      `/api/v1/feed/${type}/${id}/likes`,

    GET_COMMENTS: (
      type: 'announcements' | 'campaigns',
      id: number,
      page = 0,
      size = 20
    ) => `/api/v1/feed/${type}/${id}/comments?page=${page}&size=${size}`,

    POST_COMMENT: (type: 'announcements' | 'campaigns', id: number) =>
      `/api/v1/feed/${type}/${id}/comments`,
  },

  ANNOUNCEMENT: {
    CREATE: (coopId: string) => `/api/v1/coops/${coopId}/announcements`,
    LIST: (coopId: string, page = 0, size = 10) =>
      `/api/v1/coops/${coopId}/announcements?page=${page}&size=${size}`,
  },

  CAMPAIGN: {
    CREATE: (coopId: string) => `/api/v1/coops/${coopId}/campaigns`,
    COMMIT: (id: number) => `/api/v1/campaigns/${id}/commitments`,
    GET_COMMITMENTS: (id: number, page = 0, size = 20) =>
      `/api/v1/campaigns/${id}/commitments?page=${page}&size=${size}`,
    PUBLISH_TO_B2B: (id: number) => `/api/v1/campaigns/${id}/publish-to-b2b`,
  },
};
