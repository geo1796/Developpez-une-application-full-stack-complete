import { Injectable } from '@angular/core';
import { isBefore } from 'date-fns';
import { BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../payload/response/login-response';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public get loggedIn(): boolean {
    return this.loggedIn$.value;
  }

  public set loggedIn(b: boolean) {
    this.loggedIn$.next(b);
  }

  constructor() { }

  public saveLoginResponse(loginResponse: LoginResponse): void {
    localStorage.setItem("access_token", loginResponse.token); //required by auth0 library
    localStorage.setItem("token_expiry", loginResponse.expiry);
    setTimeout(() => this.loggedIn = false, Date.parse(loginResponse.expiry) - Date.now());
  }

  public tryAutoLogin(): void {
    const token = localStorage.getItem("access_token");
    const tokenExpiry = localStorage.getItem("token_expiry");
    if (!token || !tokenExpiry) {
      this.loggedIn = false;
      return;
    }
    const expiryDate = Date.parse(tokenExpiry);
    const now = Date.now();
    if (isBefore(expiryDate, now)) {
      this.loggedIn = false;
      return;
    }
    this.loggedIn = true;
    console.log(new Date(expiryDate))
    console.log(new Date(now))
    setTimeout(() => this.loggedIn = false, expiryDate - now);
    return;
  }
}
