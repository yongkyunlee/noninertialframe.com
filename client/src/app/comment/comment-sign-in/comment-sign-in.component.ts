import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faFacebookSquare, faGoogle } from '@fortawesome/free-brands-svg-icons';

import { AuthService } from 'src/app/auth/auth.service';
import { WindowSizeService } from 'src/app/shared/services/window-size.service';

@Component({
    selector: 'app-comment-sign-in',
    templateUrl: './comment-sign-in.component.html',
    styleUrls: ['./comment-sign-in.component.scss']
})
export class CommentSignInComponent implements OnInit {
    faEnvelope = faEnvelope;
    faGithub = faGithub;
    faFacebook = faFacebookSquare;
    faGoogle = faGoogle
    emailAuth = false;
    forgotPassword = false;
    errorMessage = '';
    authMessage = '';

    authForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });

    constructor(
        private fb: FormBuilder,
        public authService: AuthService,
        public windowSizeService: WindowSizeService
    ) { }

    ngOnInit() {
    }

    get email() {
        return this.authForm.get('email');
    }

    toggleEmailAuth() {
        this.emailAuth = !this.emailAuth;
    }

    toggleForgotPassword() {
        this.forgotPassword = true;
    }

    signInViaEmail() {
        this.authService.signInViaEmail(this.authForm.value.email, this.authForm.value.password)
            .then(() => {
                this.authMessage = '';
                this.errorMessage = '';
            })
            .catch(err => {
                this.authMessage = '';
                switch (err.code) {
                    case 'auth/invalid-email':
                        this.errorMessage = 'The email is badly formatted.';
                        break;
                    case 'auth/user-not-found':
                        this.errorMessage = 'A user with the email does not exist.';
                        break;
                    case 'auth/wrong-password':
                        this.errorMessage = 'The password or authenitcation method is wrong.';
                        break;
                    case 'auth/user-disabled':
                        this.errorMessage = 'The account is disabled.';
                        break;
                    default:
                        this.errorMessage = 'An error occurred during sign-in.';
                        break;
                }
            });
    }

    resetPassword() {
        this.authService.resetPassword(this.authForm.value.email)
            .then(() => {
                this.authMessage = 'The password reset email has been sent.';
            })
            .catch(err => {
                this.authMessage = '';
                switch (err.code) {
                    case 'auth/invalid-email':
                        this.errorMessage = 'The email is badly formatted.';
                        break;
                    case 'auth/user-not-found':
                        this.errorMessage = 'A user with the email does not exist.';
                        break;
                    default:
                        this.errorMessage = 'An error occurred while sending a password reset email.';
                }
            });
    }
}
