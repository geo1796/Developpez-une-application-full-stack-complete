import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../payload/request/register-request';
import { LoginResponse } from '../payload/response/login-response';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url: string = 'http://localhost:9000/api/register';

  constructor(private http: HttpClient) { }

  register(request: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url, request);
  }
}

