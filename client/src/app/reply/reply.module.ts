import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ReplyInputComponent } from './reply-input/reply-input.component';
import { ReplyItemComponent } from './reply-item/reply-item.component';
import { ReplyComponent } from './reply.component';

@NgModule({
    declarations: [
        ReplyComponent,
        ReplyInputComponent,
        ReplyItemComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
    ],
    exports: [
        ReplyComponent
    ]
})
export class ReplyModule { }
