import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new Subject<User>();
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(
    email: string,
    password: string,
    fname: string,
    lname: string,
    phoneNumber: number,
    birthdate: Date,
    gender: boolean
  ) {
    return this.http
      .post<AuthResponseData>('https://e-commerce-azpo.onrender.com/signup', {
        email: email,
        password: password,
        fname: fname,
        lname: lname,
        phoneNumber: phoneNumber,
        birthdate: birthdate,
        gender: gender,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            +resData.expiresIn,
            resData.idToken
          );
        })
      );
  }

  login(email: string, password: string) {
    console.log('hello');
    return this.http
      .post<AuthResponseData>('https://e-commerce-azpo.onrender.com/login', {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          // debugger;
          this.handleAuthentication(
            resData.email,
            resData.localId,
            +resData.expiresIn,
            resData.idToken
          );
        })
      );
  }

  autoLogin() {
    const userDataString: string | null = localStorage.getItem('userData');
    if (!userDataString) {
      return;
    }
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(userDataString);

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    const emptyUser = new User('', '', '', new Date(0));
    this.user.next(emptyUser);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    token: string,
    expiresIn: number,
    userId: string
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    // debugger;
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage =
          'The email address is already in use by another account.';
        break;
      // Add more cases as needed
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this email.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password.';
        break;
    }
    return throwError(() => errorMessage);
  }
}
