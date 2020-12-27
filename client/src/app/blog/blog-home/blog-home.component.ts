import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BlogService } from '../blog.service';
import { BlogPost } from '../blog-post.model';

@Component({
    selector: 'app-blog-home',
    templateUrl: './blog-home.component.html',
    styleUrls: ['./blog-home.component.scss']
})
export class BlogHomeComponent implements OnInit {

    blogSnippets: { [key: string]: BlogPost } = {};
    blogSnippetsByYear: { [key: string]: string[] } = {};
    blogSnippetsByCategory: { [key: string]: string[] } = {};
    years: string[] = [];
    categories: string[] = [];

    listByOption = 'year';
    language = localStorage.getItem('language') ? localStorage.getItem('language') as string : 'english';

    constructor(private blogSerivce: BlogService) { }

    ngOnInit() {
        this.blogSerivce.getBlogSnippets().subscribe(data => {
            for (const blogSnippet of data) {
                const year = blogSnippet.date.substring(0, 4);
                const category = blogSnippet.category;
                if (!this.blogSnippetsByYear.hasOwnProperty(year)) {
                    this.blogSnippetsByYear[year] = [];
                    this.years.push(year);
                }
                if (!this.blogSnippetsByCategory.hasOwnProperty(category)) {
                    this.blogSnippetsByCategory[category] = [];
                    this.categories.push(category);
                }
                this.blogSnippets[blogSnippet.id] = blogSnippet;
                this.blogSnippetsByYear[year].push(blogSnippet.id);
                this.blogSnippetsByCategory[category].push(blogSnippet.id);
            }
        });
    }

    changeListByOption(event: any) {
        this.listByOption = event.target.value;
    }

    chooseLanguage(language: string) {
        this.language = language;
        localStorage.setItem('language', language);
    }

}
