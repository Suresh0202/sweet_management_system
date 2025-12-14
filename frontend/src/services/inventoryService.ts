import api from './api';

export const inventoryService = {
  purchaseSweet: async (sweetId: number, quantity: number) => {
    const response = await api.post('/inventory/purchase', {
      sweet_id: sweetId,
      quantity,
    });
    return response.data;
  },

  restockSweet: async (sweetId: number, quantity: number) => {
    const response = await api.post('/inventory/restock', null, {
      params: { sweet_id: sweetId, quantity },
    });
    return response.data;
  },

  getInventoryHistory: async (sweetId: number) => {
    const response = await api.get(`/inventory/history/${sweetId}`);
    return response.data;
  },
};
