import { UserProfile, UserStatistics } from '../../types/users';
export interface AuthContextType {
  user: UserProfile | UserStatistics | null;
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
