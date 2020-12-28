import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, hasCustomClaim } from '@angular/fire/auth-guard';

import { NewBlogPostComponent } from './blog/new-blog-post/new-blog-post.component';
import { ManageBlogPostComponent } from './blog/manage-blog-post/manage-blog-post.component';
import { AdminComponent } from './admin/admin.component';
import { UpdateBlogPostComponent } from './blog/update-blog-post/update-blog-post.component';
import { ManageProjectsComponent } from './projects/manage-projects/manage-projects.component';
import { NewProjectComponent } from './projects/new-project/new-project.component';
import { UpdateProjectComponent } from './projects/update-project/update-project.component';

const adminOnly = () => hasCustomClaim('admin');

const adminRoutes: Routes = [
    { path: 'new-blog-post', component: NewBlogPostComponent, ...canActivate(adminOnly) },
    { path: 'manage-blog-post', component: ManageBlogPostComponent, ...canActivate(adminOnly) },
    { path: 'manage-blog-post/:title', component: UpdateBlogPostComponent, ...canActivate(adminOnly) },
    { path: 'manage-projects', component: ManageProjectsComponent, ...canActivate(adminOnly) },
    { path: 'manage-projects/:title', component: UpdateProjectComponent, ...canActivate(adminOnly) },
    { path: 'new-project', component: NewProjectComponent, ...canActivate(adminOnly) },
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
