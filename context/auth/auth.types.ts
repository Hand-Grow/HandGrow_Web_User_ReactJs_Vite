import { UserProfile } from '@/src/types';

export interface AuthContextType {
  user: UserProfile | null;
  initializing: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthTokens>;
  logout: () => void;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
}
