import { JwtPayload } from 'jwt-decode';
import { UserRole } from '../../constants/roles';

export interface CustomJwtPayload extends JwtPayload {
  role: string;
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
