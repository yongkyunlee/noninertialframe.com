import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
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
    commentForm = this.fb.group({
        nickname: ['', [Validators.required]],
        content: ['', [Validators.required]]
    });

    constructor(
        private fb: FormBuilder,
        public authService: AuthService,
        private commentService: CommentSerivce
    ) { }

    submitComment() {
        this.authService.afAuth.user.subscribe(data => {
            if (data) {
                const newComment = {
                    ...this.commentForm.value,
                    userId: data.uid as string,
                    timestamp: new Date()
                };
                this.commentService.createComment(this.collection, this.docId, newComment)
                    .then(res => {
                        this.commentForm.patchValue({
                            nickname: '',
                            content: ''
                        });
                    })
                    .catch(err => {
                        console.error(err);
                        this.errorMessage = 'There was an error while uploading the comment.';
                    });
                this.errorMessage = '';
            } else {
                this.errorMessage = 'There was an error while uploading the comment.';
            }
        });
    }
}
