import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../features/auth/services/auth.service';
import { inject } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify/alertify.service';
import { MessageType } from '../services/alertify/enums/MessageType';
import { Position } from '../services/alertify/enums/Position';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const alertify = inject(AlertifyService);
  const token = localStorage.getItem('token');

  if (token) {
    // Token'ın süresinin dolup dolmadığını kontrol et
    if (authService.isTokenExpired(token)) {
      authService.logout();
      return next(req); // veya oturumun süresi dolmuşsa isteği iptal edebilirsiniz
    }

    // Token'ı istek başlıklarına ekle
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    tap({
      next: (event) => {
        // İsteğin başarılı olup olmadığını kontrol edin
        console.log('HTTP Response:', event);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      // Hataları yakalayın
      console.error('HTTP Error:', error);

      // AuthorizationException hatasını yakala
      if (error.status === 401 || error.status === 403) {
        if (error.error && error.error.Type === 'AuthorizationException') {
          // Custom logic for AuthorizationException
          alertify.message("'You are not authorized to perform this action.'", {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight
          });
          authService.logout(); // Oturum kapat
          router.navigate(['/login']); // Oturum açma sayfasına yönlendir
        }
      }

      return throwError(error);
    })
  );
};
