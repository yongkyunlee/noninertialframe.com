import { Component } from '@angular/core';

import { NewBlogPost } from 'src/app/blog/models/blog-post.model';
import { EditBlogPostComponent } from '../edit-blog-post/edit-blog-post.component';

@Component({
    selector: 'app-new-blog-post',
    templateUrl: '../edit-blog-post/edit-blog-post.component.html',
    styleUrls: ['../edit-blog-post/edit-blog-post.component.scss']
})
export class NewBlogPostComponent extends EditBlogPostComponent {
    pageTitle = 'New Blog Post';
    buttonContent = 'Upload';
    mode = 'edit';

    changeMode(mode: string) {
        this.mode = mode;
    }

    uploadBlogPost() {
        const newBlogPost: NewBlogPost = {
            ...this.blogPostForm.value,
            keywordsEng: this.blogPostForm.value.keywordsEng.split(',')
                            .map((x: string) => x.trim())
                            .filter((x: string) => x !== ''),
            keywordsKor: this.blogPostForm.value.keywordsKor.split(',')
                            .map((x: string) => x.trim())
                            .filter((x: string) => x !== ''),
        };
        console.log(newBlogPost);
        this.blogService.uploadBlogPost(newBlogPost)
            .then(res => {
                this.router.navigate(['/blog']);
            });
    }
}
