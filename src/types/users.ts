import { UserRole } from '@/src/constants';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}
export interface AuthUser {
  email: string;
  role: UserRole;
  name?: string;
  avatar?: string;
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
  representativeName?: string | null;
}

export interface UpdateProfileRequest {
  fullName?: string;
  phoneNumber?: string;
  address?: string;
  commune?: string;
  province?: string;
  avatarUrl?: string;
  companyName?: string;
  representativeName?: string;
  contactEmail?: string;
}

export interface UserStatistics {
  role: UserRole;
  username: string;
}
