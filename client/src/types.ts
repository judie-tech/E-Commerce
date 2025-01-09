export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'gear' | 'trainers' | 'supplements' | 'accessories';
}

export interface CartItem extends Product {
  quantity: number;
}

export type PaymentMethod = 'mpesa' | 'card';