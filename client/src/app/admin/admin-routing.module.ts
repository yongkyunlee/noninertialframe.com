import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewBlogPostComponent } from './new-blog-post/new-blog-post.component';
import { ManageBlogPostComponent } from './manage-blog-post/manage-blog-post.component';
import { AdminComponent } from './admin/admin.component';
import { AuthAdminGuard } from '../auth/auth-admin.guard';

const adminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthAdminGuard],
        children: [
            {
                path: '',
                canActivateChild: [AuthAdminGuard],
                children: [
                    { path: 'new-blog-post', component: NewBlogPostComponent },
                    { path: 'manage-blog-post', component: ManageBlogPostComponent }
                ]
            }
        ]
    }
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
