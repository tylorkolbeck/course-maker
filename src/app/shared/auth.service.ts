import { Injectable } from '@angular/core';
import { User } from './User';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

/** Following this tutorial
 * https://www.positronx.io/angular-jwt-user-authentication-tutorial/
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

  constructor(public router: Router, private http: HttpClient) {}

  signUp(user: User): Observable<any> {
    let api = `${this.apiEndpoint}/register`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
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
}
