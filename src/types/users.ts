export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}
export interface AuthUser {
  email: string;
  role: string;
}
