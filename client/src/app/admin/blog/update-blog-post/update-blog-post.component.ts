import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { BlogPost } from 'src/app/blog/blog-post.model';
import { KEYWORDS_SEPARATOR } from 'src/app/shared/constants';
import { uniqueValueValidator } from 'src/app/shared/custom-validators';
import { EditBlogPostComponent } from '../edit-blog-post/edit-blog-post.component';

@Component({
    selector: 'app-update-blog-post',
    templateUrl: '../edit-blog-post/edit-blog-post.component.html',
    styleUrls: ['../edit-blog-post/edit-blog-post.component.scss']
})
export class UpdateBlogPostComponent extends EditBlogPostComponent implements OnInit {
    pageTitle = 'Update Blog Post';
    blogPostTitleEng: string;
    blogPostTitleKor: string;
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
            this.blogPostTitleEng = data[0].titleEng;
            this.blogPostTitleKor = data[0].titleKor;
            this.pageTitle = `Update Blog Post (${data[0].titleEng})`;
        });

        // apply validator to make sure that there is no duplicate title
        this.blogService.getBlogFieldValues(['titleEng', 'titleKor']).subscribe(data => {
            this.blogPostForm.get('titleEng')?.setValidators([
                Validators.required,
                uniqueValueValidator(data.map(item => item.titleEng)
                                         .filter(item => item !== this.blogPostTitleEng))
            ]);
            this.blogPostForm.get('titleKor')?.setValidators([
                Validators.required,
                uniqueValueValidator(data.map(item => item.titleKor)
                                         .filter(item => item !== this.blogPostTitleKor))
            ]);
        });
    }

    uploadBlogPost() {
        const updatedBlogPost: BlogPost = {
            ...this.blogPostForm.value,
            keywordsEng: this.blogPostForm.value.keywordsEng.split(KEYWORDS_SEPARATOR)
                            .map((x: string) => x.trim())
                            .filter((x: string) => x !== ''),
            keywordsKor: this.blogPostForm.value.keywordsKor.split(KEYWORDS_SEPARATOR)
                            .map((x: string) => x.trim())
                            .filter((x: string) => x !== ''),
        };
        this.blogService.updateBlogPost(this.postId, updatedBlogPost)
            .then(() => {
                this.router.navigate([`/blog/${updatedBlogPost.titleEng}`]);
            });
    }

}
