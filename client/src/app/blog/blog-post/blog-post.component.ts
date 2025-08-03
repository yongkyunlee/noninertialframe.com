import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarkdownService } from 'ngx-markdown';

import { BlogService } from '../blog.service';
import { BlogPostDoc } from '../blog-post.model';
import { BLOG_COLLECTION, LINE_NUBMERS_THRESHOLD } from 'src/app/shared/constants';
import { WindowSizeService } from 'src/app/shared/services/window-size.service';

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
import { LanguageService } from 'src/app/shared/services/language.service';


@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss', '../../shared/styles/languages.scss']
})
export class BlogPostComponent implements OnInit {
    screenWidth: number;
    lineNumbersThreshold = LINE_NUBMERS_THRESHOLD;
    titleEng: string;
    blogPost: BlogPostDoc | undefined;
    blogCollection = BLOG_COLLECTION;

    constructor(
        private router: Router,
        private blogService: BlogService,
        public windowSizeService: WindowSizeService,
        public languageService: LanguageService,
        private markdownService: MarkdownService
    ){
        const url = this.router.url;
        const urlComponent = url.split('/');
        this.titleEng = decodeURI(urlComponent[urlComponent.length - 1].split('?')[0]);
    }

    ngOnInit() {
        this.blogService.getBlogPostByTitle(this.titleEng).subscribe(data => {
            if (data.length === 0) {  // blog post with the title does not exist
                this.router.navigate(['/blog']);
            } else if (data.length > 1) {
                alert('The page has an error');
                this.router.navigate(['/blog']);
            }
            this.blogPost = data[0] as BlogPostDoc;
        });

        this.markdownService.renderer.link = (href, title, text) => {
            return `<a href="${href}" target="_blank" rel="nofollow">${text}</a>`;
        };
    }
}
