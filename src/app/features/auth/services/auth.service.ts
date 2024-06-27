import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../services/common/http-client.service';
import { RegisterUser } from '../register/models/register-user';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginUser } from '../login/models/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClientService : HttpClientService){}

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

getToken(): string {
  return localStorage.getItem('token');
}
isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}
logout(): void {
  localStorage.removeItem('token');
}
}

