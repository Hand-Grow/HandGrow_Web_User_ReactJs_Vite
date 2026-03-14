import { UserRole } from '@/src/constants';
import { JwtPayload } from 'jwt-decode';

export interface CustomJwtPayload extends JwtPayload {
  role: UserRole;
  sub: string;
}

export interface LoginJwtPayload extends JwtPayload {
  sub: string;
  role: UserRole;
}
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
}
