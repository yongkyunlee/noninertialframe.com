import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { NewBlogPostComponent } from './new-blog-post/new-blog-post.component';
import { ManageBlogPostComponent } from './manage-blog-post/manage-blog-post.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { UpdateBlogPostComponent } from './update-blog-post/update-blog-post.component';

@NgModule({
    declarations: [
        NewBlogPostComponent,
        ManageBlogPostComponent,
        AdminComponent,
        UpdateBlogPostComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatAutocompleteModule,
        AdminRoutingModule
    ]
})
export class AdminModule { }
