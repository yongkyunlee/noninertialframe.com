import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { CommentInputComponent } from './comment-input/comment-input.component';
import { CommentSignInComponent } from './comment-sign-in/comment-sign-in.component';
import { CommentComponent } from './comment.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { ReplyModule } from '../reply/reply.module';

@NgModule({
    declarations: [
        CommentComponent,
        CommentInputComponent,
        CommentSignInComponent,
        CommentListComponent,
        CommentItemComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        MatButtonModule,
        AngularFirestoreModule,
        ReplyModule
    ],
    exports: [
        CommentComponent
    ]
})
export class CommentModule { }
