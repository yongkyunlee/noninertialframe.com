import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BlogService } from 'src/app/blog/blog.service';
import { NewBlogPost } from 'src/app/blog/models/blog-post.model';
import { CATEGORIES } from '../../shared/constants';

@Component({
    selector: 'app-new-blog-post',
    templateUrl: './new-blog-post.component.html',
    styleUrls: ['./new-blog-post.component.scss']
})
export class NewBlogPostComponent {
    pageTitle = 'New Blog Post';
    buttonContent = 'Upload';
    mode = 'edit';
    categories = CATEGORIES;
    blogPostForm = this.fb.group({
        titleEng: ['', [Validators.required]],
        titleKor: ['', [Validators.required]],
        date: ['', [Validators.required, Validators.pattern('^\\d\\d\\d\\d\-\\d\\d\-\\d\\d$')]],
        category: ['', [Validators.required]],
        keywordsEng: [''],
        keywordsKor: [''],
        contentKor: [''],
        contentEng: ['']
    });

    constructor(
        private fb: FormBuilder,
        private blogService: BlogService,
        private router: Router
    ) { }

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
