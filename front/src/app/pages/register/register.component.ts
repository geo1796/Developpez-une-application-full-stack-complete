import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  public registerForm = this.fb.group({
    username: '',
    email: '',
    password: ''
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.registerForm);
  }

}
