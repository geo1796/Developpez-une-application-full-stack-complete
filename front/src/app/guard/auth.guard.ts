import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../core/service/auth.service';

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);

    const authService = inject(AuthService);
    if (!authService.loggedIn) {
        return router.parseUrl("/login");
    }

    return true;
}