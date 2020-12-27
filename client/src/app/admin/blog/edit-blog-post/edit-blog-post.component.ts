import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BlogService } from 'src/app/blog/blog.service';
import { CATEGORIES, KEYWORDS_SEPARATOR } from 'src/app/shared/constants';

import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/components/prism-python.min.js';
import 'prismjs/components/prism-docker.min.js';
import 'node_modules/prismjs/components/prism-git.min.js';
import 'node_modules/prismjs/components/prism-haskell.min.js';
import 'node_modules/prismjs/components/prism-ocaml.min.js';
import 'node_modules/prismjs/components/prism-java.min.js';
import 'node_modules/prismjs/components/prism-css.min.js';
import 'node_modules/prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';

@Component({
    selector: 'app-edit-blog-post',
    templateUrl: './edit-blog-post.component.html',
    styleUrls: ['./edit-blog-post.component.scss']
})
export class EditBlogPostComponent {
    // placeholder variables for inheritance
    pageTitle: string;
    buttonContent: string;

    mode = 'edit';
    categories = CATEGORIES;
    keywordsSeparator = KEYWORDS_SEPARATOR;
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

    // placeholder function for inheritance
    uploadBlogPost() { }

}
