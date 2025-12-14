export interface Purchase {
  id: number;
  user_id: number;
  sweet_id: number;
  sweet_name?: string;
  quantity: number;
  total_price: number;
  purchased_at: string;
}

export type PurchaseHistory = Purchase;

export interface PurchaseResponse {
  success: boolean;
  message: string;
  data?: Purchase;
}

export interface InventoryLog {
  id: number;
  sweet_id: number;
  action: string;
  quantity_change: number;
  performed_by: number;
  notes?: string;
  created_at: string;
}

export interface CartItem {
  sweet: any;
  quantity: number;
  total_price: number;
}
