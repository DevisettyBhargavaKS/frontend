import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from "../utils/constant";
import { Orderstatus } from '../model/orderstatus';

@Injectable({
  providedIn: 'root'
})
export class AorderService {
  constructor(private http: HttpClient) {}

  getorderdetails():Observable<AppResponse>{
    const appurl=`${urlEndpoint.baseUrl}/admin/order/all`
    return this.http.get<AppResponse>(appurl)
   
  }
  updateorder(orderstatus:Orderstatus):Observable<AppResponse>{
    return this.http.put<AppResponse>(`http://localhost:8080/api/admin/order/status`,orderstatus)
  }
}
