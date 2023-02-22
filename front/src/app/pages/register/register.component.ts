import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { fromEvent, map, startWith } from 'rxjs';
import { RegisterRequest } from 'src/app/core/payload/register-request';
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
export class RegisterComponent implements OnInit {

  public onError: boolean = false;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private authService: AuthService) { }

  screenWidth$ = fromEvent(window, 'resize')
    .pipe(
      map(() => window.innerWidth),
      startWith(window.innerWidth)
    );

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

  ngOnInit(): void { }

  onSubmit(): void {
    const request: RegisterRequest = new RegisterRequest(this.registerForm.value.username!,
      this.registerForm.value.email!, this.registerForm.value.password!);
    this.registerService.register(request).subscribe({
      next: jwt => {
        this.authService.loggedIn = true;
        this.authService.saveJwt(jwt);
      },
      error: _ => this.onError = true
    });
  }

}
