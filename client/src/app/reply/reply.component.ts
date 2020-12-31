import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-reply',
    templateUrl: './reply.component.html',
    styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {
    @Input() collection: string;
    @Input() docId: string;
    @Input() commentId: string;
    mode = 'read'; // 'read', 'hide', 'write'
    signedIn = true; // to make default true

    constructor(
        public authService: AuthService
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

    }

    toggleReply(mode: string) {
        this.mode = mode;
    }
}
