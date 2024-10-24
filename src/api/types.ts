export interface Category {
  id: number;
  title: string;
}
export interface Item {
  id: number;
  category: number;
  title: string;
  price: number;
  images: string[];
  sku?: string;
  manufacturer?: string;
  color?: string;
  material?: string;
  reason?: string;
  season?: string;
  sizes?: { size?: string; available?: boolean }[];
}

export interface Cart {
  id: number;
  title: string;
  size: string;
  count: number;
  price: number;
  totalPrice?: number;
}
