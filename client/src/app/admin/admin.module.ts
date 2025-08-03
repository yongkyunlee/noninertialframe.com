import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MarkdownModule } from 'ngx-markdown';

import { NewBlogPostComponent } from './blog/new-blog-post/new-blog-post.component';
import { ManageBlogPostComponent } from './blog/manage-blog-post/manage-blog-post.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { UpdateBlogPostComponent } from './blog/update-blog-post/update-blog-post.component';
import { EditBlogPostComponent } from './blog/edit-blog-post/edit-blog-post.component';
import { ManageProjectsComponent } from './projects/manage-projects/manage-projects.component';
import { EditProjectLinksComponent } from './projects/edit-project/edit-project-links/edit-project-links.component';
import { NewProjectComponent } from './projects/new-project/new-project.component';
import { UpdateProjectComponent } from './projects/update-project/update-project.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';

@NgModule({
    declarations: [
        NewBlogPostComponent,
        ManageBlogPostComponent,
        AdminComponent,
        UpdateBlogPostComponent,
        EditBlogPostComponent,
        ManageProjectsComponent,
        NewProjectComponent,
        EditProjectLinksComponent,
        UpdateProjectComponent,
        EditProjectComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatAutocompleteModule,
        AdminRoutingModule,
        MarkdownModule.forChild()
    ]
})
export class AdminModule { }
