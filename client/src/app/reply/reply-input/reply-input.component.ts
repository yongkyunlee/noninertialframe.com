import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/auth.service';
import { NICKNAME_MAX_LENGTH } from 'src/app/shared/constants';
import { ReplyModeService } from '../reply-mode.service';
import { ReplyService } from '../reply.service';

@Component({
    selector: 'app-reply-input',
    templateUrl: './reply-input.component.html',
    styleUrls: ['./reply-input.component.scss', '../../shared/styles/textarea.scss']
})
export class ReplyInputComponent {
    @Input() collection: string;
    @Input() docId: string;
    @Input() commentId: string;
    errorMessage = '';
    nicknameMaxLength = NICKNAME_MAX_LENGTH;
    replyForm = this.fb.group({
        nickname: ['', [Validators.required, Validators.maxLength(NICKNAME_MAX_LENGTH)]],
        content: ['', [Validators.required]]
    });
    isUploading = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private replyService: ReplyService,
        private replyModeService: ReplyModeService
    ) { }

    submitReply() {
        this.isUploading = true;
        this.authService.afAuth.user.pipe(first()).subscribe(data => {
            if (data) {
                const newReply = {
                    ...this.replyForm.value,
                    userId: data.uid as string,
                    timestamp: new Date()
                };
                this.replyService.createReply(this.collection, this.docId, this.commentId, newReply)
                    .then(() => {
                        this.errorMessage = '';
                        this.replyForm.patchValue({
                            nickname: '',
                            content: ''
                        });
                        this.replyModeService.writeModeIdSet.delete(this.commentId);
                        this.isUploading = false;
                    })
                    .catch(err => {
                        console.error(err);
                        this.errorMessage = 'There was an error while uploading the reply.';
                        this.isUploading = false;
                    });
            } else {
                this.errorMessage = 'You need to sign in to leave a reply.';
            }
        });
    }

}
