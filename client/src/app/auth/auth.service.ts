import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    redirectUrl: string;

    constructor(public afAuth: AngularFireAuth, private router: Router) { }

    signIn(email: string, password: string, successRedirectUrl = '', errorRedirectUrl = '') {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then(res => {
                if (res.user && successRedirectUrl !== '') {
                        this.router.navigate([successRedirectUrl]);
                } else {
                    alert('Failed to sign in');
                    if (errorRedirectUrl !== '') {
                        this.router.navigate([errorRedirectUrl]);
                    }
                }
            })
            .catch(error => {
                console.log(error);
                if (errorRedirectUrl !== '') {
                    this.router.navigate([errorRedirectUrl]);
                }
            });
    }

    signOut() {
        this.afAuth.signOut();
        this.router.navigate(['/']);
    }

    isAdmin() {
        // return this.afAuth.authState.subscribe(user => {
        //     if (user) {
        //         if (user.email === environment.adminEmail) {
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     } else {
        //         return false;
        //     }
        // });
        return this.afAuth.authState.pipe(
            map(user => {
                if (user && user.email === environment.adminEmail) {
                    return true;
                } else {
                    return false;
                }
            })
        );
    }

    isLoggedIn() {
        return this.afAuth.authState.pipe(
            map(user => {
                console.log(user);
                if (user) {
                    return true;
                } else {
                    return false;
                }
            })
        );
    }
}
