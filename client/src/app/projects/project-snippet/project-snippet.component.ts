import { Component, Input, inject } from '@angular/core';
import { LanguageService } from 'src/app/shared/services/language.service';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';

import { ProjectSnippet } from '../projects.model';

@Component({
    selector: 'app-project-snippet',
    templateUrl: './project-snippet.component.html',
    styleUrls: ['./project-snippet.component.scss']
})
export class ProjectSnippetComponent {
    public languageService = inject(LanguageService);
    
    @Input() projectSnippet: ProjectSnippet;
    faCheck = faCheck;
    faGithub = faGithubSquare;

}
