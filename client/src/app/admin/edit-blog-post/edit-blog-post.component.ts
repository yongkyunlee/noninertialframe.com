import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/blog/blog.service';
import { CATEGORIES } from 'src/app/shared/constants';

@Component({
    selector: 'app-edit-blog-post',
    templateUrl: './edit-blog-post.component.html',
    styleUrls: ['./edit-blog-post.component.scss']
})
export class EditBlogPostComponent {
    pageTitle: string;
    buttonContent: string;
    mode = 'edit';
    categories = CATEGORIES;
    titleEng: string;
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
        protected fb: FormBuilder,
        protected blogService: BlogService,
        protected router: Router
    ) {
        const url = this.router.url;
        const urlComponent = url.split('/');
        this.titleEng = decodeURI(urlComponent[urlComponent.length - 1]);
    }

    changeMode(mode: string) {
        this.mode = mode;
    }

    uploadBlogPost() { }

}
