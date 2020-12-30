import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-comment-input',
    templateUrl: './comment-input.component.html',
    styleUrls: ['./comment-input.component.scss']
})
export class CommentInputComponent {
    commentForm = this.fb.group({
        nickname: ['', [Validators.required]],
        content: ['', [Validators.required]]
    });

    constructor(
        private fb: FormBuilder,
        public authService: AuthService
    ) { }

    submitComment() {
        alert('submit');
    }
}
