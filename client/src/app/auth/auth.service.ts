import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    redirectUrl: string;

    constructor(public afAuth: AngularFireAuth, private router: Router) { }

    signIn(email: string, password: string) {
        return this.afAuth.signInWithEmailAndPassword(email, password);
    }

    signInViaGoogle() {
        return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    signOut() {
        console.log(this.afAuth.user);
        console.log('sign out');
        return this.afAuth.signOut();
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
