import api from './api';
import { Token, LoginCredentials, RegisterCredentials } from '../types/auth';

export const authService = {
  register: async (data: RegisterCredentials): Promise<Token> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginCredentials): Promise<Token> => {
    const response = await api.post('/auth/login', null, {
      params: {
        username: data.username,
        password: data.password,
      },
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
  },

  saveToken: (token: Token) => {
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('user_id', token.user_id.toString());
  },

  getToken: () => localStorage.getItem('access_token'),
};
