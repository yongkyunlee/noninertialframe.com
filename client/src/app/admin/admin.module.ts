import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewBlogPostComponent } from './new-blog-post/new-blog-post.component';
import { ManageBlogPostComponent } from './manage-blog-post/manage-blog-post.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';

@NgModule({
    declarations: [
        NewBlogPostComponent,
        ManageBlogPostComponent,
        AdminComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule
    ]
})
export class AdminModule { }
