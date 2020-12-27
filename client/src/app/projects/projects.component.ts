import { Component, OnInit } from '@angular/core';

import { LanguageService } from '../shared/services/language.service';
import { ProjectSnippet } from './projects.model';
import { ProjectsService } from './projects.service';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss', '../shared/styles/languages.scss']
})
export class ProjectsComponent implements OnInit {
    projectSnippets: ProjectSnippet[] = [];

    constructor(
        private projectsService: ProjectsService,
        public languageService: LanguageService
    ) { }

    ngOnInit() {
        this.projectsService.getProjects().subscribe(data => {
            for (const project of data) {
                this.projectSnippets.push(project);
            }
            console.log(this.projectSnippets);
        });
    }


}
