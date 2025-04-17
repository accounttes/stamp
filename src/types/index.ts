export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export type PaymentMethod = 'cash' | 'card';

export interface PaymentState {
  method: PaymentMethod;
  amount: number;
  insertedAmount: number;
  status: 'pending' | 'success' | 'error';
  message: string;
} 