import { Component, Input, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CommentDoc } from '../comment.model';
import { CommentSerivce } from '../comment.service';

@Component({
    selector: 'app-comment-list',
    templateUrl: './comment-list.component.html',
    styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
    private commentService = inject(CommentSerivce);
    public authService = inject(AuthService);
    
    @Input() collection: string;
    @Input() docId: string;
    @Input() signedIn: boolean;
    comments: CommentDoc[];

    ngOnInit() {
        this.commentService.getComments(this.collection, this.docId).subscribe(data => {
            this.comments = data;
        });
    }

    trackByFn(index: number, comment: CommentDoc) {
        return comment.id;
    }
}
