import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../features/auth/services/auth.service';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('token');

  if (token ) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  } else if (token) {
    authService.logout();
  }

  return next(req);
};
