import type { UserRole } from './roles';
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
