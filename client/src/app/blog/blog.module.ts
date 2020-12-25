import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogHomeComponent } from './blog-home/blog-home.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogSnippetComponent } from './blog-home/blog-snippet/blog-snippet.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BlogHomeComponent,
    BlogPostComponent,
    BlogSnippetComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BlogRoutingModule,
    SharedModule,
    MarkdownModule.forChild()
  ]
})
export class BlogModule { }