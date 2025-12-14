import api from './api';
import { PurchaseResponse, PurchaseHistory, InventoryLog } from '../types/purchase';

export const inventoryService = {
  /**
   * Purchase a sweet
   */
  async purchase(sweetId: number, quantity: number): Promise<PurchaseResponse> {
    try {
      const response = await api.post<PurchaseResponse>(
        `/inventory/purchase`,
        { sweet_id: sweetId, quantity }
      );
      return response.data;
    } catch (error) {
      console.error(`Error purchasing sweet ${sweetId}:`, error);
      throw error;
    }
  },

  /**
   * Restock a sweet (Admin only)
   */
  async restock(sweetId: number, quantity: number, notes?: string): Promise<void> {
    try {
      await api.post(`/inventory/restock`, {
        sweet_id: sweetId,
        quantity,
        notes,
      });
    } catch (error) {
      console.error(`Error restocking sweet ${sweetId}:`, error);
      throw error;
    }
  },

  /**
   * Get purchase history
   */
  async getPurchaseHistory(sweetId?: number): Promise<PurchaseHistory[]> {
    try {
      if (sweetId) {
        const response = await api.get<PurchaseHistory[]>(
          `/inventory/history/${sweetId}`
        );
        return response.data;
      }
      const response = await api.get<PurchaseHistory[]>('/purchases');
      return response.data;
    } catch (error) {
      console.error('Error fetching purchase history:', error);
      throw error;
    }
  },

  /**
   * Get inventory logs (Admin only)
   */
  async getInventoryLogs(sweetId: number): Promise<InventoryLog[]> {
    try {
      const response = await api.get<InventoryLog[]>(
        `/inventory/history/${sweetId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching inventory logs for sweet ${sweetId}:`, error);
      throw error;
    }
  },
};
