import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BlogHomeComponent } from "./blog-home/blog-home.component";
import { BlogPostComponent } from "./blog-post/blog-post.component";

const blogRoutes: Routes = [
    { path: ':title', component: BlogPostComponent },
    { path: '', component: BlogHomeComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(blogRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class BlogRoutingModule { }