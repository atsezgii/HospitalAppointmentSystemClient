import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../features/auth/services/auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
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
      },
      error: (error) => {
        // Hataları yakalayın
        console.error('HTTP Error:', error);
      }
    })
  );
};
