import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  genders = ['male', 'female'];

  loginForm = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^01[0-2]d{1,8}$'),
    ]),
    gender: new FormControl('female'),
    birthdate: new FormControl('', [Validators.required]),
  });

  user = {
    fname: '',
    lname: '',
    email: '',
    gender: 'female',
    password: '',
    phoneNumber: '',
    birthdate: '',
  };

  submitted = false;
  onsubmit() {
    this.submitted = true;
    this.user.fname = this.loginForm.controls['fname'].value || '';
    this.user.lname = this.loginForm.controls['lname'].value || '';
    this.user.email = this.loginForm.controls['email'].value || '';
    this.user.birthdate = this.loginForm.controls['birthdate'].value || '';
    this.user.gender = this.loginForm.controls['gender'].value || 'female';
    this.user.password = this.loginForm.controls['password'].value || '';
    this.user.phoneNumber = this.loginForm.controls['phoneNumber'].value || '';
  }
}
