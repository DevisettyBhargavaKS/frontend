import { Category } from './category';
import { Filetype } from './filetype';

export interface Userproducts {
  id?: number;
  title: string;
  description: string;
  price: number;
  category_id?:number;
  photo?:Filetype;
  
}
