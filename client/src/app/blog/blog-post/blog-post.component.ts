import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { BlogService } from '../blog.service';
import { BlogPost } from '../models/blog-post.model';

import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
    titleEng: string;
    blogPost: BlogPost;
    contentEng = '';
    language = 'english';

    testData = '';

    constructor(private router: Router, private blogService: BlogService) {
        const url = this.router.url;
        const urlComponent = url.split('/');
        this.titleEng = decodeURI(urlComponent[urlComponent.length - 1]);
    }

    ngOnInit() {
        this.blogService.getBlogPostByTitle(this.titleEng).subscribe(data => {
            if (data.length !== 1) {
                alert('The page has an error');
                this.router.navigate(['/blog']);
            }
            this.blogPost = data[0] as BlogPost;
        });
    }

    chooseLanguage(language: string) {
        this.language = language;
    }

    printData() {
        console.log(this.testData);
    }

}
