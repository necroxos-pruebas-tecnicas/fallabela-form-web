import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }

  get(url: string, params?: HttpParams): Observable<any> {
    return this.httpClient.get(url, { params: params });
  }

  post(url: string, body: any): Observable<any> {
    return this.httpClient.post(url, body);
  }
}
