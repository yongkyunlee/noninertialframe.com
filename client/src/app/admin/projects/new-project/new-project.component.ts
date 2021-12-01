import { Component } from '@angular/core';
import { ProjectSnippet } from 'src/app/projects/projects.model';
import { EditProjectComponent } from '../edit-project/edit-project.component';

@Component({
    selector: 'app-new-project',
    templateUrl: '../edit-project/edit-project.component.html',
    styleUrls: ['../edit-project/edit-project.component.scss']
})
export class NewProjectComponent extends EditProjectComponent {
    pageTitle = 'New Project';
    buttonContent = 'Upload';

    uploadProject() {
        const newLinks: { [key: string]: string } = {};
        for (const link of this.projectForm.value.links) {
            newLinks[(link.website as string).toLowerCase()] = link.url;
        }
        const newProject: ProjectSnippet = {
            ...this.projectForm.value,
            links: newLinks
        };
        this.projectService.uploadProject(newProject)
            .then(res => {
                console.log(res);
                this.router.navigate(['/projects']);
            })
            .catch(err => {
                console.error(err);
                alert(err);
            });
    }
}
