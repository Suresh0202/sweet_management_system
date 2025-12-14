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
      const payload = {
        sweet_id: sweetId,
        quantity: Number(quantity),
        notes: notes || "",
      };
      console.log('Restock payload:', payload);
      await api.post(`/inventory/restock`, payload);
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
      // Get all user purchases
      const response = await api.get<any>('/inventory/purchases');
      return response.data?.data || [];
    } catch (error) {
      console.error('Error fetching purchase history:', error);
      return [];
    }
  },

  /**
   * Clear all purchase history for current user
   */
  async clearPurchaseHistory(): Promise<void> {
    try {
      await api.delete('/inventory/purchases');
    } catch (error) {
      console.error('Error clearing purchase history:', error);
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
