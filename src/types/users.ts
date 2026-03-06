import { UserRole } from './roles';

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
}

export interface UserStatistics {
  role: UserRole;
  username: string;
}
