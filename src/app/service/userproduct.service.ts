import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { AppResponse } from "../model/appResponse";
import { urlEndpoint } from "../utils/constant";
import { Userproducts } from '../model/userproducts';


@Injectable({
  providedIn: 'root'
})
export class UserproductService {
  constructor(private http: HttpClient) { }

  getAlluserproducts(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/user/product/all`
    );
  }
  addToCart(body:any): Observable<AppResponse> {
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/cart`,body);
  }
  
  getUserCart(id:number): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/cart/${id}`);
  }

  removeFromCart(userId:number,id:number): Observable<AppResponse>{
    return this.http.delete<AppResponse>(`${urlEndpoint.baseUrl}/cart/delete/${userId}`);
  }
  // getProduct():Userproducts[]{
  //   return produc
  // }
}
