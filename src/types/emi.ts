export interface EMIPlan {
  id: number;
  variantId: number;
  monthlyPayment: number;
  tenure: number; // In months (3, 6, 12, etc.)
  interestRate: number; // Percentage (e.g. 0, 10.5)
  cashback: number; // Cashback in INR
  createdAt?: string;
  updatedAt?: string;
}

export interface SelectedEMIDetails {
  plan: EMIPlan;
  productName: string;
  brand: string;
  color: string;
  storage: string;
  price: number;
  mrp: number;
  image: string;
}
