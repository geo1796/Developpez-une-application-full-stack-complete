import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../core/service/auth.service';

export const unauthGuard: CanActivateFn = () => {
    const router = inject(Router);

    const authService = inject(AuthService);
    if (authService.loggedIn) {
        return router.parseUrl("/overview?show=article");
    }

    return true;
}