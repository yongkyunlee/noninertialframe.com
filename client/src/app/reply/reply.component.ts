import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { ReplyDoc } from './reply.model';
import { ReplyService } from './reply.service';

@Component({
    selector: 'app-reply',
    templateUrl: './reply.component.html',
    styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
    @Input() collection: string;
    @Input() docId: string;
    @Input() commentId: string;
    @Input() signedIn: boolean;
    replies: ReplyDoc[];
    mode = 'read'; // 'read', 'write'

    constructor(
        public authService: AuthService,
        private replyService: ReplyService
    ) { }

    ngOnInit() {
        this.replyService.getReplies(this.collection, this.docId, this.commentId).subscribe(data => {
            this.replies = data;
        });
    }

    toggleReply() {
        if (this.mode === 'read') {
            this.mode = 'write';
        } else if (this.mode === 'write') {
            this.mode = 'read';
        }
    }

    updateMode($event: boolean) {
        if ($event) {
            this.mode = 'read';
        }
    }
}
