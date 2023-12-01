import { Address } from "./address";
import { OrderedItems } from "./ordered-items";
import { Productlist } from "./productlist";
export interface Order {
    statusID: number;
    id:number;
    orderedItems:OrderedItems[];
    userId:number;
    name: String;
    address:Address;
    orderStatus:String;
    productList:Productlist
}
