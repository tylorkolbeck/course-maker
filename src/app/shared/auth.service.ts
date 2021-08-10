import { Injectable } from '@angular/core';
import { User } from './User';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

/** Following this tutorial
 * https://www.positronx.io/angular-jwt-user-authentication-tutorial/
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public router: Router) { 

  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }
}
