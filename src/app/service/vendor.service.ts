import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Vendor } from '../model/vendor';
import { Userproducts } from '../model/userproducts';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  constructor(private http: HttpClient) {}
  getallvendors(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/user/vendor/all`
    );
  }
  postVendor(vendor: Vendor): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/vendor/insert`,
      vendor
    );
  }

  putCategory(category: Vendor): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/category`,
      category
    );
  }

  deleteCategory(id: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/category/${id}`
    );
  }

  // deleteProduct(id: number): Observable<AppResponse> {
  //   return this.http.delete<AppResponse>(
  //     `${urlEndpoint.baseUrl}/vendor/${id}`
  //   );
  // }

  getallProducts(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/vendor/all/all`);
  }

  postProduct(category: Userproducts): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/vendor`,
      category
    );
  }

  putProduct(category: Userproducts): Observable<AppResponse> {
    return this.http.put<AppResponse>(
      `${urlEndpoint.baseUrl}/vendor`,
      category
    );
  }

  deleteProduct(id: number): Observable<AppResponse> {
    return this.http.delete<AppResponse>(`${urlEndpoint.baseUrl}/vendor/${id}`);
  }

  addvendor(product: FormData) {
    console.log(product);

    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/vendor`,
      product
    );
  }
}
