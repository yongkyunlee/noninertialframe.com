import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, Validators } from '@angular/forms';
import { ProjectSnippet } from 'src/app/projects/projects.model';

import { EditProjectComponent } from '../edit-project/edit-project.component';

@Component({
    selector: 'app-update-project',
    templateUrl: '../edit-project/edit-project.component.html',
    styleUrls: ['../edit-project/edit-project.component.scss']
})
export class UpdateProjectComponent extends EditProjectComponent implements OnInit {
    pageTitle = 'Update Project';
    projectTitleEng: string;
    projectTitleKor: string;
    buttonContent = 'Update';
    projectId: string;

    ngOnInit(): void {
        this.projectService.getProjectByTitle(this.titleEng).subscribe(data => {
            if (data.length > 1) {
                alert('this page has an error');
                console.error(data);
            }
            this.projectId = data[0].id;

            this.projectForm.patchValue({
                titleEng: data[0].titleEng,
                titleKor: data[0].titleKor,
                date: data[0].date,
                descriptionEng: data[0].descriptionEng,
                descriptionKor: data[0].descriptionKor,
            });

            this._clearFormArray(this.projectForm.get('notesEng') as UntypedFormArray);
            for (const noteEng of data[0].notesEng) {
                (this.projectForm.get('notesEng') as UntypedFormArray).push(this.fb.control(
                    noteEng, [Validators.required]
                ));
            }

            this._clearFormArray(this.projectForm.get('notesKor') as UntypedFormArray);
            for (const noteKor of data[0].notesKor) {
                (this.projectForm.get('notesKor') as UntypedFormArray).push(this.fb.control(
                    noteKor, [Validators.required]
                ));
            }

            this._clearFormArray(this.projectForm.get('links') as UntypedFormArray);
            for (const website of Object.keys(data[0].links)) {
                (this.projectForm.get('links') as UntypedFormArray).push(this.fb.group({
                    website: [website, [Validators.required]],
                    url: [data[0].links[website], [Validators.required]]
                }));
            }

            this.projectTitleEng = data[0].titleEng;
            this.projectTitleKor = data[0].titleKor;
            this.pageTitle = `Update Project (${data[0].titleEng})`;
        });
    }

    _clearFormArray(formArray: UntypedFormArray) {
        while (formArray.length !== 0) {
            formArray.removeAt(0);
        }
    }

    uploadProject() {
        const newLinks: Record<string, string> = {};
        for (const link of this.projectForm.value.links) {
            newLinks[(link.website as string).toLowerCase()] = link.url;
        }
        const newProject: ProjectSnippet = {
            ...this.projectForm.value,
            links: newLinks
        };
        this.projectService.updateProject(this.projectId, newProject)
            .then(() => {
                this.router.navigate(['/projects']);
            })
            .catch(err => {
                console.error(err);
                alert(err);
            });
    }
}
