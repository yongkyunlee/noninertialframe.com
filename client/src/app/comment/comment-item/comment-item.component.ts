import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CommentDoc } from '../comment.model';
import { CommentSerivce } from '../comment.service';

@Component({
    selector: 'app-comment-item',
    templateUrl: './comment-item.component.html',
    styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {
    @Input() comment: CommentDoc;
    @Input() collection: string;
    @Input() docId: string;
    mode = 'read';
    newContent: string;
    errorMessage = '';

    constructor(
        public authService: AuthService,
        private commentService: CommentSerivce
    ) { }

    ngOnInit() {
        this.newContent = this.comment.content;
    }

    changeMode(mode: string) {
        if (this.mode === mode) {
            this.mode = 'read';
        } else {
            this.mode = mode;
        }
    }

    deleteComment() {
        this.commentService.deleteComment(this.collection, this.docId, this.comment.id)
            .catch(err => {
                console.error(err);
                this.errorMessage = 'An error occurred while deleting the comment';
            });
    }

    updateComment() {
        const updatedComment = {
            ...this.comment,
            content: this.newContent
        };
        this.commentService.updateComment(this.collection, this.docId, updatedComment)
            .catch(err => {
                console.error(err);
                this.errorMessage = 'An error occurred while updating the comment.';
            });
    }

}
