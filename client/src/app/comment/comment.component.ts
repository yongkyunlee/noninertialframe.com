import { Component, Input, OnInit, inject } from '@angular/core';

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
    public authService = inject(AuthService);
    public windowSizeService = inject(WindowSizeService);
    private commentService = inject(CommentSerivce);
    
    @Input() collection: string;
    @Input() docId: string;
    comments: CommentDoc[] = [];
    signedIn = true;  // used to make true default for logged in state

    constructor() {
        this.authService.user.subscribe(data => {
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
