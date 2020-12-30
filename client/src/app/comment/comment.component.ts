import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { WindowSizeService } from '../shared/services/window-size.service';
import { CommentDoc } from './comment.model';
import { CommentSerivce } from './comment.service';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
    @Input() collection: string;
    @Input() docId: string;
    comments: CommentDoc[] = [];
    signedIn = true;  // used to make true default for logged in state

    constructor(
        public authService: AuthService,
        public windowSizeService: WindowSizeService,
        private commentService: CommentSerivce,
    ) {
        this.authService.afAuth.user.subscribe(data => {
            if (data) {
                this.signedIn = true;
            } else {
                this.signedIn = false;
            }
        });
    }

    ngOnInit() {
        this.commentService.getComments(this.collection, this.docId).subscribe(data => {
            this.comments = data;
        });
    }
}
