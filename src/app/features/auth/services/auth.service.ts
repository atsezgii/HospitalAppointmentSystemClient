import { Injectable } from '@angular/core';
import { HttpClientService, RequestParameters } from '../../../services/common/http-client.service';
import { RegisterUser } from '../register/models/register-user';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginUser } from '../login/models/login';
import { Observable, BehaviorSubject, tap, Subscription, interval } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '../../../services/common/jwt-helper.service';
import { ChangePassword } from '../change-password/models/change-password';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<string | null>;
  public currentUser: Observable<string | null>;
  private tokenCheckSubscription: Subscription;

  constructor(
    private httpClientService: HttpClientService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    const token = localStorage.getItem('token');
    this.currentUserSubject = new BehaviorSubject<string | null>(token ? this.jwtHelper.getUserId(token) : null);
    this.currentUser = this.currentUserSubject.asObservable();
    console.log(" this.currentUser", this.currentUser)

        // Token süresini belirli aralıklarla kontrol et
        this.startTokenExpirationCheck();

  }
  private startTokenExpirationCheck(): void {
    this.tokenCheckSubscription = interval(60000).subscribe(() => { // 60 saniyede bir kontrol et
      console.log("interval çalıştı")
      const token = localStorage.getItem('token');
      if (token && this.jwtHelper.isTokenExpired(token)) {
        this.logout();
      }
    });
  }
  register(registerUser: RegisterUser, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): void {
    this.httpClientService.post({
      controller: "Auth/Register"
    }, registerUser)
    .subscribe({
      next: () => {
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

  login(loginUser: LoginUser): Observable<any> {
    return this.httpClientService.post<any>({
      controller: 'Auth/Login'
    }, loginUser).pipe(
      tap(response => {
        const token = response.token;
        localStorage.setItem('token', token);
        this.currentUserSubject.next(this.jwtHelper.getUserId(token));
      })
    );
  }

  changePassword(changePassword: Partial<ChangePassword>): Observable<ChangePassword> {
    const requestParameter: Partial<RequestParameters> = {
      controller: 'Auth/ChangePassword'
    };
    console.log("testttt",changePassword)
    return this.httpClientService.put<ChangePassword>(requestParameter, changePassword);
  }
  getCurrentUserId(): string | null {
    const token = localStorage.getItem('token');
    return token ? this.jwtHelper.getUserId(token) : null;
  }
  getCurrentUserName(): string | null {
    const token = localStorage.getItem('token');
    return token ? this.jwtHelper.getUserName(token) : null;
  }
  getCurrentUser(): any {
    const token = localStorage.getItem('token');
    return token ? this.jwtHelper.decodeToken(token) : null;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    if (this.tokenCheckSubscription) {
      this.tokenCheckSubscription.unsubscribe();
    }
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }
}
