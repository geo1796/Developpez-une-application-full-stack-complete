import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { fromEvent, map, startWith } from 'rxjs';
import { RegisterRequest } from 'src/app/core/payload/register-request';
import { RegisterService } from 'src/app/core/service/register.service';
import { customEmailValidator } from 'src/app/core/validator/email-validator';
import { passwordValidator } from 'src/app/core/validator/password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public onError: boolean = false;

  constructor(private fb: FormBuilder, private registerService: RegisterService) { }

  screenWidth$ = fromEvent(window, 'resize')
    .pipe(
      map(() => window.innerWidth),
      startWith(window.innerWidth)
    );

  public registerForm = this.fb.group({
    username: ['', Validators.required],
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
      next: _ => { },
      error: _ => this.onError = true
    });
  }

}
