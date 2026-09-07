import { EMIPlan } from './emi';

export interface Variant {
  id: number;
  productId: number;
  color: string;
  storage: string;
  mrp: number;
  price: number;
  image: string;
  emiPlans?: EMIPlan[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductDetail {
  id: number;
  name: string;
  slug: string;
  brand: string;
  description: string;
  variants: Variant[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductListItem {
  id: number;
  name: string;
  slug: string;
  brand: string;
  description: string;
  startingPrice: number;
  startingMrp: number;
  lowestMonthlyPayment?: number;
  thumbnail: string;
  availableColors: string[];
  availableStorages: string[];
  variantCount: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: unknown;
}
