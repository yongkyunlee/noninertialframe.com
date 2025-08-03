import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    redirectUrl: string;

    constructor(public afAuth: AngularFireAuth, private router: Router) { }

    signInViaEmail(email: string, password: string) {
        return this.afAuth.signInWithEmailAndPassword(email, password);
    }

    signInViaGoogle() {
        return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    signInViaFacebook() {
        return this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }

    signInViaGithub() {
        return this.afAuth.signInWithPopup(new firebase.auth.GithubAuthProvider());
    }

    signOut() {
        return this.afAuth.signOut();
    }

    resetPassword(email: string) {
        return this.afAuth.sendPasswordResetEmail(email);
    }
}
