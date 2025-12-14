export interface Token {
  access_token: string;
  token_type: string;
  user_id: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export type LoginRequest = LoginCredentials;
export type RegisterRequest = RegisterCredentials;

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    username: string;
    email: string;
    is_admin: boolean;
    is_active: boolean;
    created_at: string;
  };
}
