import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isLoginMode = true; //if the user is logged in
  isLoading = false;
  error: string | null = null;
  constructor(private authService: AuthService, private router: Router) {}
  genders = ['male', 'female'];

  signupForm = new FormGroup({
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

  // user = {
  //   fname: '',
  //   lname: '',
  //   email: '',
  //   gender: 'female',
  //   password: '',
  //   phoneNumber: '',
  //   birthdate: '',
  // };

  submitted = false;
  onsubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const fname = form.value.fname;
    const lname = form.value.lname;
    const phoneNumber = form.value.phoneNumber;
    const birthdate = form.value.birthdate;
    const gender = form.value.gender;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.signup(
        email,
        password,
        fname,
        lname,
        phoneNumber,
        birthdate,
        gender
      );
      authObs.subscribe({
        next: (resData) => {
          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (errorMessage) => {
          this.error = errorMessage;
          this.isLoading = false;
        },
        complete: () => (this.isLoading = false),
      });
      form.reset();
    }
  }
  //   this.submitted = true;
  //   this.user.fname = this.signupForm.controls['fname'].value || '';
  //   this.user.lname = this.signupForm.controls['lname'].value || '';
  //   this.user.email = this.signupForm.controls['email'].value || '';
  //   this.user.birthdate = this.signupForm.controls['birthdate'].value || '';
  //   this.user.gender = this.signupForm.controls['gender'].value || 'female';
  //   this.user.password = this.signupForm.controls['password'].value || '';
  //   this.user.phoneNumber = this.signupForm.controls['phoneNumber'].value || '';
  // }
}
