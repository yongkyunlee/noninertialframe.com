import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BlogService } from 'src/app/blog/blog.service';
import { BlogPost } from 'src/app/blog/models/blog-post.model';

@Component({
  selector: 'app-manage-blog-post',
  templateUrl: './manage-blog-post.component.html',
  styleUrls: ['./manage-blog-post.component.scss']
})
export class ManageBlogPostComponent implements OnInit {
    blogPosts: BlogPost[];
    searchControl = new FormControl();
    options: string[];
    filteredOptions$: Observable<string[]>;
    filteredBlogPosts$: Observable<BlogPost[]>;

    constructor(private blogService: BlogService) { }

    ngOnInit() {
        this.blogService.getBlogSnippets().subscribe(data => {
            this.blogPosts = data;
            this.options = data.map(x => x.titleEng);
        });

        this.filteredOptions$ = this.searchControl.valueChanges.pipe(
            map(value => this._filterOption(value))
        );

        this.filteredBlogPosts$ = this.searchControl.valueChanges.pipe(
            map(value => this._filterBlogPost(value)),
        );
    }

    private _filterOption(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option =>
            option.toLowerCase().includes(filterValue)
        );
    }

    private _filterBlogPost(value: string): BlogPost[] {
        const filterValue = value.toLowerCase();
        return this.blogPosts.filter(blogPost =>
            blogPost.titleEng.toLowerCase().includes(filterValue)
        );
    }
}
