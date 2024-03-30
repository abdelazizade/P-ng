import { Component } from '@angular/core';
import { AuthResponseData, AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  isLoginMode = true; //if the user is logged in
  isLoading = false;
  error: string | null = null;
  constructor(private authService: AuthService, private router: Router) {}

  // onSwitchMode() {
  //   this.isLoginMode = !this.isLoginMode;
  // }

  onSubmit(form: NgForm) {
    //console.log(form.value);
    // debugger;
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      // authObs = this.authService.signup(email, password);
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
}
