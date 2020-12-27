import { Component, Input } from '@angular/core';

import { ProjectSnippet } from '../projects.model';

@Component({
    selector: 'app-project-snippet',
    templateUrl: './project-snippet.component.html',
    styleUrls: ['./project-snippet.component.scss']
})
export class ProjectSnippetComponent {
    @Input() projectSnippet: ProjectSnippet;

    constructor() { }

}
