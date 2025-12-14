import api from './api';
import { Sweet, CreateSweetRequest, UpdateSweetRequest, SearchSweetsParams } from '../types/sweet';

export const sweetService = {
  /**
   * Get all sweets
   */
  async getAll(params?: { skip?: number; limit?: number }): Promise<Sweet[]> {
    try {
      const response = await api.get<Sweet[]>('/sweets', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching sweets:', error);
      throw error;
    }
  },

  /**
   * Get sweet by ID
   */
  async getById(id: number): Promise<Sweet> {
    try {
      const response = await api.get<Sweet>(`/sweets/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching sweet ${id}:`, error);
      throw error;
    }
  },

  /**
   * Search sweets
   */
  async search(params: SearchSweetsParams): Promise<Sweet[]> {
    try {
      const response = await api.get<Sweet[]>('/sweets/search', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching sweets:', error);
      throw error;
    }
  },

  /**
   * Create a new sweet (Admin only)
   */
  async create(data: CreateSweetRequest): Promise<Sweet> {
    try {
      const response = await api.post<Sweet>('/sweets', data);
      return response.data;
    } catch (error) {
      console.error('Error creating sweet:', error);
      throw error;
    }
  },

  /**
   * Update a sweet (Admin only)
   */
  async update(id: number, data: UpdateSweetRequest): Promise<Sweet> {
    try {
      const response = await api.put<Sweet>(`/sweets/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating sweet ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a sweet (Admin only)
   */
  async delete(id: number): Promise<any> {
    try {
      const response = await api.delete(`/sweets/${id}`);
      console.log('Delete response:', response);
      return response.data;
    } catch (error: any) {
      console.error(`Error deleting sweet ${id}:`, error);
      throw error;
    }
  },
};
