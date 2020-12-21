import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BlogService } from '../blog.service';
import { BlogSnippet } from '../models/blog-snippet.model';

@Component({
    selector: 'app-blog-home',
    templateUrl: './blog-home.component.html',
    styleUrls: ['./blog-home.component.scss']
})
export class BlogHomeComponent implements OnInit {

    listByOption = 'year';
    blogSnippets: { [key: string]: BlogSnippet } = {};
    blogSnippetsByYear: { [key: string]: string[] } = {};
    blogSnippetsByCategory: { [key: string]: string[] } = {};
    years: string[] = [];
    categories: string[] = [];

    constructor(private blogSerivce: BlogService) { }

    ngOnInit() {
        this.blogSerivce.getBlogSnippets().subscribe(data => {
            console.log(data);
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

}
