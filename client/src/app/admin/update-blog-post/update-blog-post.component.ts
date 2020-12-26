import { Component, OnInit } from '@angular/core';

import { EditBlogPostComponent } from '../edit-blog-post/edit-blog-post.component';

@Component({
    selector: 'app-update-blog-post',
    templateUrl: '../edit-blog-post/edit-blog-post.component.html',
    styleUrls: ['../edit-blog-post/edit-blog-post.component.scss']
})
export class UpdateBlogPostComponent extends EditBlogPostComponent implements OnInit {
    pageTitle = 'Update Blog Post';
    buttonContent = 'Update';

    ngOnInit() {
        this.blogService.getBlogPostByTitle(this.titleEng).subscribe(data => {
            if (data.length !== 1) {
                alert('The page has an error');
                this.router.navigate(['/blog']);
            }
            this.blogPostForm.patchValue(data[0]);
        });
    }

    changeMode(mode: string) {
        this.mode = mode;
    }

    uploadBlogPost() {
        console.log(this.blogPostForm.value);
    }

}
