import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { AppResponse } from '../model/appResponse';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  error: String = '';
  constructor(private http: HttpClient) {}

  getAllBooks(): void {
    this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/user/product/all`).subscribe({
      next: (response) => {
        console.log(response.data);
        return response;
      },
      error: (err) => {
        console.log(err?.error?.error?.message);
      },
    });
  }
}
