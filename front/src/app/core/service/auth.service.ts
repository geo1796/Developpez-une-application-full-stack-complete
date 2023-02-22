import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  public get loggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  public get loggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  public set loggedIn(b: boolean) {
    this.loggedInSubject.next(b);
  }

  constructor() { }

  public saveJwt(jwt: string): void {
    localStorage.setItem("access_token", jwt); //required by auth0 library
  }
}
