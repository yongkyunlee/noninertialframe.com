import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogHomeComponent } from './blog-home/blog-home.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogSnippetComponent } from './blog-home/blog-snippet/blog-snippet.component';
import { SharedModule } from '../shared/shared.module';
import { CommentComponent } from '../comment/comment.component';

@NgModule({
  declarations: [
    BlogHomeComponent,
    BlogPostComponent,
    BlogSnippetComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    FontAwesomeModule,
    BlogRoutingModule,
    SharedModule,
    MarkdownModule.forChild(),
  ]
})
export class BlogModule { }
