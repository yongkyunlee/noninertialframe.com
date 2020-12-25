import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad,
         Router, RouterStateSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const url: string = state.url;

        return this.checkIsAdmin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): Observable<boolean> {
        const url = `/${route.path}`;

        return this.checkIsAdmin(url);
    }

    checkIsAdmin(url: string) {
        // return this.authService.isAdmin().subscribe(isAdmin => {
        //     if (isAdmin) {
        //         return true;
        //     } else {
        //         this.authService.redirectUrl = url;
        //         this.router.navigate(['/auth/login']);
        //         return false;
        //     }
        // });
        this.authService.redirectUrl = url;
        return this.authService.isAdmin();

        // if (this.authService.isAdmin()) {
        //     return true;
        // }
        // this.authService.redirectUrl = url;
        // this.router.navigate(['/auth/login']);
        // return false;
    }
}
