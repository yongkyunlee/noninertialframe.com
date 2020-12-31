import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ReplyDoc } from '../reply.model';
import { ReplyService } from '../reply.service';

@Component({
    selector: 'app-reply-item',
    templateUrl: './reply-item.component.html',
    styleUrls: ['./reply-item.component.scss', '../../shared/styles/textarea.scss']
})
export class ReplyItemComponent implements OnInit {
    @Input() reply: ReplyDoc;
    @Input() collection: string;
    @Input() docId: string;
    @Input() commentId: string;

    mode = 'read';
    errorMessage = '';
    newContent: string;

    constructor(
        public authService: AuthService,
        private replyService: ReplyService
    ) { }

    ngOnInit(): void {
        this.newContent = this.reply.content;
    }

    changeMode(mode: string) {
        if (this.mode === mode) {
            this.mode = 'read';
        } else {
            this.mode = mode;
        }
    }

    updateReply() {
        const updatedReply = {
            ...this.reply,
            content: this.newContent
        };
        this.replyService.updateReply(this.collection, this.docId, this.commentId, updatedReply)
            .catch(err => {
                console.error(err);
                this.errorMessage = 'An error occurred while updating the reply';
            });
    }

    deleteReply() {
        this.replyService.deleteReply(this.collection, this.docId, this.commentId, this.reply.id)
            .catch(err => {
                console.error(err);
                this.errorMessage = 'An error occurred while updating the reply';
            });
    }
}
