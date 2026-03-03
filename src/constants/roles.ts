export const USER_ROLES = {
  COOP: 'COOP',
  FARMER: 'FARMER',
  ENTERPRISE: 'ENTERPRISE',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
