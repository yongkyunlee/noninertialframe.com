import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
}
