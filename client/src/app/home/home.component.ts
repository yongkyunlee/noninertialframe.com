import { Component, OnInit } from '@angular/core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { BlogPostDoc } from '../blog/blog-post.model';
import { BlogService } from '../blog/blog.service';
import { ProjectSnippet } from '../projects/projects.model';
import { ProjectsService } from '../projects/projects.service';
import { N_HOME_BLOG_SNIPPETS, N_HOME_PROJECT_SINPPETS } from '../shared/constants';
import { LanguageService } from '../shared/services/language.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss', '../shared/styles/languages.scss', '../about/timeline/timeline.component.scss']
})
export class HomeComponent implements OnInit {
    blogSnippetArr: BlogPostDoc[];
    projectSnippetArr: ProjectSnippet[];
    faEllipsisV = faEllipsisV;

    constructor(
        public languageService: LanguageService,
        private blogService: BlogService,
        private projectsService: ProjectsService
    ) { }

    ngOnInit() {
        this.blogService.getRecentBlogPosts(N_HOME_BLOG_SNIPPETS).subscribe(data => {
            this.blogSnippetArr = data;
        });

        this.projectsService.getRecentProjects(N_HOME_PROJECT_SINPPETS).subscribe(data => {
            this.projectSnippetArr = data;
        });
    }
}
