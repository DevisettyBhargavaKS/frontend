import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from "../utils/constant";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}
 
  getuserdetails():Observable<AppResponse>{
    const appurl=`${urlEndpoint.baseUrl}/admin/user/all`
    return this.http.get<AppResponse>(appurl)
   
  }
 
}
