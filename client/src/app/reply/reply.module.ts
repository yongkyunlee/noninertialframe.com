import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReplyListComponent } from './reply-list/reply-list.component';
import { ReplyInputComponent } from './reply-input/reply-input.component';
import { ReplyItemComponent } from './reply-item/reply-item.component';
import { ReplyComponent } from './reply.component';

@NgModule({
    declarations: [
        ReplyComponent,
        ReplyListComponent,
        ReplyInputComponent,
        ReplyItemComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        ReplyComponent
    ]
})
export class ReplyModule { }
