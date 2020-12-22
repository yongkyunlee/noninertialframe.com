import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DateStrPipe } from './date-str.pipe';

@NgModule({
    declarations: [
        DateStrPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DateStrPipe
    ]
})
export class SharedModule { }
