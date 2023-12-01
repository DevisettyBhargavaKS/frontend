import { Productlist } from './productlist';

export interface Aorders {
  id: number;
  username: string;
  orderstatus: string;
  productList: Productlist[];
}
