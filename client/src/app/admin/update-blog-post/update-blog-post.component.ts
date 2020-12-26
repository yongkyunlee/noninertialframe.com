import { Component, OnInit } from '@angular/core';

import { NewBlogPost } from 'src/app/blog/models/blog-post.model';
import { KEYWORDS_SEPARATOR } from 'src/app/shared/constants';
import { EditBlogPostComponent } from '../edit-blog-post/edit-blog-post.component';

@Component({
    selector: 'app-update-blog-post',
    templateUrl: '../edit-blog-post/edit-blog-post.component.html',
    styleUrls: ['../edit-blog-post/edit-blog-post.component.scss']
})
export class UpdateBlogPostComponent extends EditBlogPostComponent implements OnInit {
    pageTitle = 'Update Blog Post';
    buttonContent = 'Update';
    postId: string;

    ngOnInit() {
        this.blogService.getBlogPostByTitle(this.titleEng).subscribe(data => {
            if (data.length > 1) {
                alert('this page has an error');
                console.error(data);
            }
            this.postId = data[0].id;
            this.blogPostForm.patchValue({
                ...data[0],
                keywordsEng: data[0].keywordsEng.join(KEYWORDS_SEPARATOR),
                keywordsKor: data[0].keywordsKor.join(KEYWORDS_SEPARATOR)
            });
        });
    }

    uploadBlogPost() {
        console.log(this.blogPostForm.value);
        const newBlogPost: NewBlogPost = {
            ...this.blogPostForm.value,
            keywordsEng: this.blogPostForm.value.keywordsEng.split(KEYWORDS_SEPARATOR)
                            .map((x: string) => x.trim())
                            .filter((x: string) => x !== ''),
            keywordsKor: this.blogPostForm.value.keywordsKor.split(KEYWORDS_SEPARATOR)
                            .map((x: string) => x.trim())
                            .filter((x: string) => x !== ''),
        };
        this.blogService.updateBlogPost(this.postId, newBlogPost)
            .then(() => {
                this.router.navigate([`/blog/${newBlogPost.titleEng}`]);
            });
    }

}
