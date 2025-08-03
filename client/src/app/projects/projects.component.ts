import { Component, OnInit, inject } from '@angular/core';

import { LanguageService } from '../shared/services/language.service';
import { ProjectSnippet } from './projects.model';
import { ProjectsService } from './projects.service';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss', '../shared/styles/languages.scss']
})
export class ProjectsComponent implements OnInit {
    private projectsService = inject(ProjectsService);
    public languageService = inject(LanguageService);
    
    projectSnippets: ProjectSnippet[] = [];
    nAdditionalDivs = 0;

    ngOnInit() {
        this.projectsService.getProjects().subscribe(data => {
            this.projectSnippets = data;
            if (this.projectSnippets.length % 6 !== 0) {
                this.nAdditionalDivs = 6 - this.projectSnippets.length % 6;
            }
        });
    }


}
