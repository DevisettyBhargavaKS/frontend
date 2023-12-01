import { Userproducts } from './userproducts';

export interface Cart {
  id: number;
  product: Userproducts;
  count: number;
  price: number;
}
