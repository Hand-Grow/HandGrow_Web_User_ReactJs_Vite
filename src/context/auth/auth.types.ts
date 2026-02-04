import { AuthUser } from '../../types/users';
export interface AuthContextType {
  user: AuthUser | null;
  initializing: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthTokens>;
  logout: () => void;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
}
