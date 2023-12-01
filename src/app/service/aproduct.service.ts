import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AppResponse } from "../model/appResponse";
import { urlEndpoint } from "../utils/constant";

@Injectable({
  providedIn: 'root'
})
export class AproductService {

  constructor(private http: HttpClient) { }

  getaproducts(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/product/all`
    );
  }
}
