import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../payload/register-request';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url: string = 'http://localhost:9000/api/register';

  constructor(private http: HttpClient) { }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post<any>(this.url, request);
  }
}

