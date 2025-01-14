import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, map, startWith, Subscription } from 'rxjs';
import { LoginRequest } from 'src/app/core/payload/request/login-request';
import { RegisterRequest } from 'src/app/core/payload/request/register-request';
import { AuthService } from 'src/app/core/service/auth.service';
import { LoginService } from 'src/app/core/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  private loginSub?: Subscription;
  public onError: boolean = false;

  screenWidth$ = fromEvent(window, 'resize')
    .pipe(
      map(() => window.innerWidth),
      startWith(window.innerWidth)
    );

  constructor(private fb: FormBuilder, private authService: AuthService, 
    private loginService: LoginService, private router: Router) { }

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  get usernameControl() {
    return this.loginForm.get('username');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  ngOnDestroy(): void {
    if (this.loginSub !== undefined) {
      this.loginSub.unsubscribe();
    }
  }

  onSubmit(): void {
    const request: LoginRequest = new LoginRequest(this.loginForm.value.username!, this.loginForm.value.password!);
    this.loginSub = this.loginService.register(request).subscribe({
      next: loginResponse => {
        this.authService.loggedIn = true;
        this.authService.saveLoginResponse(loginResponse);
        this.router.navigateByUrl('/overview?show=post');
      },
      error: _ => this.onError = true
    });
  }

}
