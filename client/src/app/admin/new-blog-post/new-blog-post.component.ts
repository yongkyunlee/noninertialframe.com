import { Component } from '@angular/core';

import { NewBlogPost } from 'src/app/blog/models/blog-post.model';
import { KEYWORDS_SEPARATOR } from 'src/app/shared/constants';
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

    uploadBlogPost() {
        const newBlogPost: NewBlogPost = {
            ...this.blogPostForm.value,
            keywordsEng: this.blogPostForm.value.keywordsEng.split(KEYWORDS_SEPARATOR)
                            .map((x: string) => x.trim())
                            .filter((x: string) => x !== ''),
            keywordsKor: this.blogPostForm.value.keywordsKor.split(KEYWORDS_SEPARATOR)
                            .map((x: string) => x.trim())
                            .filter((x: string) => x !== ''),
        };
        this.blogService.uploadBlogPost(newBlogPost)
            .then(res => {
                console.log(res);
                this.router.navigate(['/blog']);
            })
            .catch(err => {
                console.error(err);
                alert(err);
            });
    }
}
