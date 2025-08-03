import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signInWithPopup, signOut, sendPasswordResetEmail, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, user, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private auth = inject(Auth);
    private router = inject(Router);
    
    redirectUrl: string;
    user: Observable<User | null>;

    constructor() { 
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
