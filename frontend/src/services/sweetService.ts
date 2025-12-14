import api from './api';
import { Sweet, SweetCreate, SweetUpdate } from '../types/sweet';

export const sweetService = {
  getAllSweets: async (skip = 0, limit = 100, category?: string): Promise<Sweet[]> => {
    const response = await api.get('/sweets/', {
      params: { skip, limit, category },
    });
    return response.data;
  },

  getSweetById: async (id: number): Promise<Sweet> => {
    const response = await api.get(`/sweets/${id}`);
    return response.data;
  },

  createSweet: async (sweet: SweetCreate): Promise<Sweet> => {
    const response = await api.post('/sweets/', sweet);
    return response.data;
  },

  updateSweet: async (id: number, sweet: SweetUpdate): Promise<Sweet> => {
    const response = await api.put(`/sweets/${id}`, sweet);
    return response.data;
  },

  deleteSweet: async (id: number): Promise<void> => {
    await api.delete(`/sweets/${id}`);
  },
};
