import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../services/common/http-client.service';
import { RegisterUser } from '../register/models/register-user';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginUser } from '../login/models/login';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClientService : HttpClientService,private router: Router){}

  create(registerUser: RegisterUser, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
        controller: "Auth/Register"
    }, registerUser)
    .subscribe({
        next: (result) => {
            if (successCallBack) {
                successCallBack();
            }
        },
        error: (errorResponse: HttpErrorResponse) => {
            if (errorCallBack) {
                errorCallBack(errorResponse.message);
            }
        }
    });
}
login(registerUser: LoginUser): Observable<any> {
  return this.httpClientService.post<any>({
    controller: 'Auth/Login'
  }, registerUser);
}

getCurrentUser(): any {
  const token = localStorage.getItem('token');
  // return token ? this.jwtHelper.decodeToken(token) : null;
}
// isLoggedIn(): boolean {
//   const token = localStorage.getItem('token');
//   // return token && !this.jwtHelper.isTokenExpired(token);
// }
logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('date');
  this.router.navigate(['/login']);
}
getToken(): string {
  return localStorage.getItem('token');
}
// isTokenExpired(): boolean {
//   const token = localStorage.getItem('token');
//   // return this.jwtHelper.isTokenExpired(token);
// }
}

