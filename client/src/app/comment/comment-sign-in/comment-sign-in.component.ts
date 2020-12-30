import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-comment-sign-in',
    templateUrl: './comment-sign-in.component.html',
    styleUrls: ['./comment-sign-in.component.scss']
})
export class CommentSignInComponent implements OnInit {
    faEnvelope = faEnvelope;
    emailAuth = false;
    forgotPassword = false;
    authForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });

    constructor(
        private fb: FormBuilder,
        public authService: AuthService
    ) { }

    ngOnInit() {
    }

    toggleEmailAuth() {
        this.emailAuth = !this.emailAuth;
    }

    toggleForgotPassword() {
        this.forgotPassword = true;
    }

    signInViaEmail() {
        alert('sign in ');
    }

    resetPassword() {
        confirm('Reset Password via Email');
    }

}
