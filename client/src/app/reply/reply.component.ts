import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { ReplyModeService } from './reply-mode.service';
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

    constructor(
        public authService: AuthService,
        private replyService: ReplyService,
        public replyModeService: ReplyModeService
    ) { }

    ngOnInit() {
        this.replyService.getReplies(this.collection, this.docId, this.commentId).subscribe(data => {
            this.replies = data;
        });
    }

    toggleReply() {
        if (this.replyModeService.writeModeIdSet.has(this.commentId)) {
            this.replyModeService.writeModeIdSet.delete(this.commentId);
        } else {
            this.replyModeService.writeModeIdSet.add(this.commentId);
        }
    }

    trackByFn(index: number, reply: ReplyDoc) {
        return reply.id;
    }
}
