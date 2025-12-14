export interface Sweet {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface SweetCreate {
  name: string;
  description?: string;
  price: number;
  quantity?: number;
  category?: string;
  image_url?: string;
}

export interface SweetUpdate {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  category?: string;
  image_url?: string;
}

export type CreateSweetRequest = SweetCreate;
export type UpdateSweetRequest = SweetUpdate;

export interface SearchSweetsParams {
  q?: string;
  category?: string;
  skip?: number;
  limit?: number;
}
