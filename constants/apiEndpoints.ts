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

    TOGGLE_LIKE: (type: 'announcement' | 'campaign', id: string) =>
      `/api/v1/feed/${type.toUpperCase()}/${id}/likes`,

    GET_COMMENTS: (
      type: 'announcement' | 'campaign',
      id: string,
      page = 0,
      size = 20
    ) =>
      `/api/v1/feed/${type.toUpperCase()}/${id}/comments?page=${page}&size=${size}`,

    POST_COMMENT: (type: 'announcement' | 'campaign', id: string) =>
      `/api/v1/feed/${type.toUpperCase()}/${id}/comments`,
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
    PUBLISH_TO_B2B: (id: string) => `/api/v1/campaigns/${id}/publish-to-b2b`,
  },
  MARKETPLACE: {
    LIST: (page = 0) => `/api/v1/marketplace/bulk-sales?page=${page}`,
    DETAIL: (id: string) => `/api/v1/marketplace/bulk-sales/${id}`,
    CREATE_OFFER: (id: string) => `/api/v1/marketplace/bulk-sales/${id}/offers`,
    BULK_SALES: '/api/v1/marketplace/bulk-sales',
    BULK_SALE_DETAIL: (id: string) => `/api/v1/marketplace/bulk-sales/${id}`,
    MY_OFFERS: '/api/v1/enterprises/me/offers',
    BULK_POSTS: '/api/v1/market/bulk-posts',
  },
  MESSAGE: {
    CONVERSATIONS: '/api/v1/messages/conversations',
    CONVERSATION_DETAIL: (id: string) => `/api/v1/messages/conversations/${id}`,
    CONVERSATION_MESSAGES: (id: string) =>
      `/api/v1/messages/conversations/${id}/messages`,
    SEND_MESSAGE: (id: string) =>
      `/api/v1/messages/conversations/${id}/messages`,
    MARK_AS_READ: (id: string) => `/api/v1/messages/conversations/${id}/read`,
    SEARCH_CONVERSATIONS: '/api/v1/messages/conversations/search',
  },
  CHAT: {
    ROOMS: '/api/v1/chat/rooms',
    MESSAGES: (roomId: string) => `/api/v1/chat/rooms/${roomId}/messages`,
  },
  FILES: {
    PRESIGNED_URL: (filename: string, contentType: string) =>
      `/api/v1/files/presigned-url?filename=${filename}&contentType=${contentType}`,
  },
};
