import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BlogService } from '../blog.service';
import { BlogPost } from '../blog-post.model';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
    selector: 'app-blog-home',
    templateUrl: './blog-home.component.html',
    styleUrls: ['./blog-home.component.scss', '../../shared/styles/languages.scss']
})
export class BlogHomeComponent implements OnInit {
    blogSnippets: Record<string, BlogPost> = {};
    blogSnippetsByYear: Record<string, string[]> = {};
    blogSnippetsByCategory: Record<string, string[]> = {};
    years: string[] = [];
    categories: string[] = [];

    listByOption = 'year';

    constructor(
        private blogService: BlogService,
        public languageService: LanguageService
    ) { }

    ngOnInit() {
        this.blogService.getBlogSnippets().subscribe(data => {
            this.years = [];
            this.categories = [];
            this.blogSnippets = {};
            this.blogSnippetsByYear = {};
            this.blogSnippetsByCategory = {};
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
