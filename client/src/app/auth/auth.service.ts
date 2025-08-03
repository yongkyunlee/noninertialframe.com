import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signInWithPopup, signOut, sendPasswordResetEmail, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, user, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    redirectUrl: string;
    user: Observable<User | null>;

    constructor(private auth: Auth, private router: Router) { 
        this.user = user(this.auth);
    }

    signInViaEmail(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    signInViaGoogle() {
        return signInWithPopup(this.auth, new GoogleAuthProvider());
    }

    signInViaFacebook() {
        return signInWithPopup(this.auth, new FacebookAuthProvider());
    }

    signInViaGithub() {
        return signInWithPopup(this.auth, new GithubAuthProvider());
    }

    signOut() {
        return signOut(this.auth);
    }

    resetPassword(email: string) {
        return sendPasswordResetEmail(this.auth, email);
    }
}
