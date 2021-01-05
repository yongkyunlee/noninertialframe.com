import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/auth.service';
import { NICKNAME_MAX_LENGTH } from 'src/app/shared/constants';
import { CommentSerivce } from '../comment.service';

@Component({
    selector: 'app-comment-input',
    templateUrl: './comment-input.component.html',
    styleUrls: ['./comment-input.component.scss', '../../shared/styles/textarea.scss']
})
export class CommentInputComponent {
    @Input() collection: string;
    @Input() docId: string;
    errorMessage = '';
    nicknameMaxLength = NICKNAME_MAX_LENGTH;
    commentForm = this.fb.group({
        nickname: ['', [Validators.required, Validators.maxLength(NICKNAME_MAX_LENGTH)]],
        content: ['', [Validators.required]]
    });
    isUploading = false;

    constructor(
        private fb: FormBuilder,
        public authService: AuthService,
        private commentService: CommentSerivce
    ) { }

    submitComment() {
        this.isUploading = true;
        this.authService.afAuth.user.pipe(first()).subscribe(data => {
            console.log('subscribing to authservice');
            if (data) {
                const newComment = {
                    ...this.commentForm.value,
                    userId: data.uid as string,
                    timestamp: new Date(),
                    nReplies: 0
                };
                this.commentService.createComment(this.collection, this.docId, newComment)
                    .then(res => {
                        this.commentForm.patchValue({
                            nickname: '',
                            content: ''
                        });
                        this.isUploading = false;
                    })
                    .catch(err => {
                        console.error(err);
                        this.isUploading = false;
                        this.errorMessage = 'There was an error while uploading the comment.';
                    });
                this.errorMessage = '';
            } else {
                this.errorMessage = 'You need to sign in to leave a comment.';
            }
        });
    }
}
