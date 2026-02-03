export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER_COOP: '/api/v1/auth/register/coop',
    REGISTER_ENTERPRISE: '/api/v1/auth/register/enterprise',
  },

  LOCATION: {
    PROVINCES: 'https://provinces.open-api.vn/api/v2/p',
    PROVINCE_DETAIL: (code) =>
      `https://provinces.open-api.vn/api/v2/p/${code}?depth=2`,
  },
};
