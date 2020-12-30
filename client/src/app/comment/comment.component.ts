import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import { AuthService } from '../auth/auth.service';
import { WindowSizeService } from '../shared/services/window-size.service';
import { CommentDoc } from './comment.model';
import { CommentSerivce } from './comment.service';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss', './comment.sign-in.component.scss']
})
export class CommentComponent implements OnInit {
    @Input() collection: string;
    @Input() docId: string;
    faEnvelope = faEnvelope;
    nicknameInput: string;
    comments: CommentDoc[] = [];
    emailAuth = false;
    forgotPassword = false;
    authGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });

    constructor(
        public authService: AuthService,
        public windowSizeService: WindowSizeService,
        private commentService: CommentSerivce,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.commentService.getComments(this.collection, this.docId).subscribe(data => {
            this.comments = data;
        });
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
