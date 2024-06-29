// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { Router } from '@angular/router';
import { AuthService } from '../features/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem("token")

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
