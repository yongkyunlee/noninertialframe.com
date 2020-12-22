import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from '../../models/blog-post.model';

@Component({
    selector: 'app-blog-snippet',
    templateUrl: './blog-snippet.component.html',
    styleUrls: ['./blog-snippet.component.scss']
})
export class BlogSnippetComponent implements OnInit {
    @Input() language: string;
    @Input() blogSnippet: BlogPost;

    blogPostUrl: string;

    ngOnInit() {
        this.blogPostUrl = '/blog/' + this.blogSnippet.titleEng;
    }
}
