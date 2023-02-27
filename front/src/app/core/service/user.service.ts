import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = 'http://localhost:9000/api/user';

  constructor(private http: HttpClient) { }

  public getUser(): Observable<User> {
    return this.http.get<User>(this.url);
  }

  public updateUser(username: string, email: string): Observable<User> {
    const body = {'username': username, 'email': email};
    return this.http.put<User>(this.url, body);
  }
}
