import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (!environment.enableAdmin) {
    // Redirect to home if admin is disabled (production)
    router.navigate(['/']);
    return false;
  }

  return true;
};
