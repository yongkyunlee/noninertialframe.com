import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CommentDoc } from '../comment.model';
import { CommentSerivce } from '../comment.service';

@Component({
    selector: 'app-comment-list',
    templateUrl: './comment-list.component.html',
    styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
    @Input() collection: string;
    @Input() docId: string;
    comments: CommentDoc[];

    constructor(
        private commentService: CommentSerivce,
        public authService: AuthService
    ) { }

    ngOnInit() {
        this.commentService.getComments(this.collection, this.docId).subscribe(data => {
            this.comments = data;
        });
    }

}
