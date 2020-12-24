import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DateStrEngPipe, DateStrKorPipe } from './date-str.pipe';

@NgModule({
    declarations: [
        DateStrEngPipe,
        DateStrKorPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DateStrEngPipe,
        DateStrKorPipe
    ]
})
export class SharedModule { }
