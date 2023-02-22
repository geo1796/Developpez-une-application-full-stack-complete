import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../payload/request/login-request';
import { LoginResponse } from '../payload/response/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = 'http://localhost:9000/api/login';

  constructor(private http: HttpClient) { }

  register(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url, request);
  }
}
