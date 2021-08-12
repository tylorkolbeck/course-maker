import { Injectable } from '@angular/core';
import { User } from '../../../app/shared/Models/User';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

/** Following this guide for auth service
 * https://www.positronx.io/angular-jwt-user-authentication-tutorial/
 *
 * Following this guide for refresh token handling
 * https://jasonwatmore.com/post/2020/05/22/angular-9-jwt-authentication-with-refresh-tokens
 *
 */

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiEndpoint: string = environment.authApiUrl;
  headers: HttpHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
  currentUser: User | null = null;
  profile: any | null = null;
  refreshTokenTimeout: any = null;

  constructor(public router: Router, private http: HttpClient) {}

  signIn(email: string, password: string): Observable<any> {
    let apiUrl = `${this.apiEndpoint}/auth/login`;
    const payload = {
      email,
      password,
    };

    return this.http.post<any>(apiUrl, payload).pipe(
      map((res: any) => {
        // Set the returned tokens in localstorage
        localStorage.setItem(
          'access_token',
          res.content.tokens.accessToken.token
        );
        localStorage.setItem(
          'refresh_token',
          res.content.tokens.refreshToken.token
        );
        console.log(res.content.user);
        let { id, email, fullName } = res.content.user;

        this.currentUser = {
          _id: id,
          email,
          name: fullName,
        };

        this.getUserProfile().subscribe(({ content }) => {
          this.profile = content;
        });
        this.startRefreshTokenTimer();

        return 'success';
      }),
      catchError((error: any) => {
        return throwError(error.error.error);
      })
    );
  }

  signUp(user: User): Observable<any> {
    let apiUrl = `${this.apiEndpoint}/auth/register`;
    return this.http.post(apiUrl, user).pipe(catchError(this.handleError));
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    this.stopRefreshTokenTimer();
    if (removeToken == null) {
      this.router.navigateByUrl('/login');
    }
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  refreshToken() {
    let apiUrl = `${this.apiEndpoint}/auth/refresh`;
    let refreshtoken = localStorage.getItem('refresh_token');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-refresh-token': refreshtoken ? refreshtoken : '',
      }),
    };

    if (refreshtoken) {
      return this.http.post(apiUrl, {}, httpOptions).pipe(
        map((user: any) => {
          console.log('[User Token Refreshed]');
          this.startRefreshTokenTimer();
          return user;
        }),
        catchError(this.handleError)
      );
    } else {
      return EMPTY;
    }
  }

  getUserProfile() {
    let apiUrl = `${this.apiEndpoint}/private/user/profile`;
    return this.http.get(apiUrl).pipe(catchError(this.handleError));
  }

  handleError(res: HttpErrorResponse): Observable<any> {
    const { error } = res;
    let message = '';

    if (error instanceof ErrorEvent) {
      // client side error
      message = error.message;
    } else {
      message = error.error.message;
    }

    return throwError(message);
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  private startRefreshTokenTimer() {
    const token = this.getToken();
    // parse json object from base64 encoded jwt token
    if (token) {
      // const jwtToken = JSON.parse(atob(token));
      const jwtToken = JSON.parse(atob(token.split('.')[1]));
      // set a timeout to refresh the token a minute before it expires
      const expires = new Date(jwtToken.exp * 1000);

      const timeout = expires.getTime() - Date.now() - 60 * 1000;
      this.refreshTokenTimeout = setTimeout(
        () => this.refreshToken().subscribe(),
        timeout
      );
    }
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
