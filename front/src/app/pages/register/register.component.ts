import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, map, startWith, Subscription } from 'rxjs';
import { RegisterRequest } from 'src/app/core/payload/request/register-request';
import { AuthService } from 'src/app/core/service/auth.service';
import { RegisterService } from 'src/app/core/service/register.service';
import { customEmailValidator } from 'src/app/core/validator/email-validator';
import { passwordValidator } from 'src/app/core/validator/password-validator';
import { usernameValidator } from 'src/app/core/validator/username-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {

  public onError: boolean = false;
  private registerSub?: Subscription;

  screenWidth$ = fromEvent(window, 'resize')
    .pipe(
      map(() => window.innerWidth),
      startWith(window.innerWidth)
    );

  constructor(private fb: FormBuilder, private registerService: RegisterService, 
    private authService: AuthService, private router: Router) { }

  public registerForm = this.fb.group({
    username: ['', [Validators.required, usernameValidator()]],
    email: ['', [Validators.required, Validators.email, customEmailValidator()]],
    password: ['', [Validators.required, Validators.minLength(8), passwordValidator]]
  });

  get usernameControl() {
    return this.registerForm.get('username');
  }

  get emailControl() {
    return this.registerForm.get('email');
  }

  get passwordControl() {
    return this.registerForm.get('password');
  }

  ngOnDestroy(): void {
    if (this.registerSub !== undefined) {
      this.registerSub.unsubscribe();
    }
  }

  onSubmit(): void {
    const request: RegisterRequest = new RegisterRequest(this.registerForm.value.username!,
      this.registerForm.value.email!, this.registerForm.value.password!);
    this.registerSub = this.registerService.register(request).subscribe({
      next: loginResponse => {
        this.authService.loggedIn = true;
        this.authService.saveLoginResponse(loginResponse);
        this.router.navigateByUrl('/overview?show=article');
      },
      error: _ => this.onError = true
    });
  }

}
