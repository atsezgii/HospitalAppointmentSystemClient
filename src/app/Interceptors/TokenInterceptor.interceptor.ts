// token.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../features/auth/services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
// interceptor Angular uygulamanızın HTTP isteklerine JWT token ekleyecek ve böylece kullanıcı kimlik doğrulamasını sağlayacaktır. Interceptor, tokeni almak için AuthService servisinden yararlanacak ve her istek için Authorization başlığına tokeni ekleyecektir.
