import { Component, OnInit } from '@angular/core';

enum AuthMode { LOGIN, REGISTER }

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  private mode: AuthMode = AuthMode.LOGIN;

  public get loginMode(): boolean {
    return this.mode === AuthMode.LOGIN;
  }

  constructor() { }

  ngOnInit(): void {
  }

  toggleAuthMode(): void {
    this.mode === AuthMode.LOGIN
      ? this.mode = AuthMode.REGISTER
      : this.mode = AuthMode.LOGIN;
  }

}
