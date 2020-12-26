import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, hasCustomClaim } from '@angular/fire/auth-guard';

import { NewBlogPostComponent } from './new-blog-post/new-blog-post.component';
import { ManageBlogPostComponent } from './manage-blog-post/manage-blog-post.component';
import { AdminComponent } from './admin/admin.component';
import { EditBlogPostComponent } from './edit-blog-post/edit-blog-post.component';

const adminOnly = () => hasCustomClaim('admin');

const adminRoutes: Routes = [
    { path: 'new-blog-post', component: NewBlogPostComponent, ...canActivate(adminOnly) },
    { path: 'manage-blog-post', component: ManageBlogPostComponent, ...canActivate(adminOnly) },
    { path: 'manage-blog-post/:title', component: EditBlogPostComponent, ...canActivate(adminOnly) },
    { path: '', component: AdminComponent, ...canActivate(adminOnly) }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }
