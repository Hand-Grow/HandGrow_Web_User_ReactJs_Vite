export enum UserRole {
  ENTERPRISE = 'ENTERPRISE',
  FARMER = 'FARMER',
  COOP = 'COOP',
}

export interface UserProfile {
  id: string;
  fullName: string;
  username: string;
  phoneNumber: string;
  role: UserRole;
  avatarUrl?: string | null;
  address: string | null;
  commune: string | null;
  province: string | null;
  produce: string | null;
}

export interface UserStatistics {
  role: UserRole;
  username: string;
}
