import { Component, inject } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/projects/projects.service';

@Component({
    selector: 'app-edit-project',
    templateUrl: './edit-project.component.html',
    styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent {
    // placeholder used by inherited components
    pageTitle: string;
    buttonContent: string;

    protected fb = inject(UntypedFormBuilder);
    protected router = inject(Router);
    protected projectService = inject(ProjectsService);

    titleEng: string;
    projectForm = this.fb.group({
        titleEng: ['', [Validators.required]],
        titleKor: ['', [Validators.required]],
        descriptionEng: ['', [Validators.required]],
        descriptionKor: ['', [Validators.required]],
        date: ['', [Validators.required, Validators.pattern('^\\d\\d\\d\\d-\\d\\d-\\d\\d$')]],
        notesKor: this.fb.array([
            // this.fb.control('', [Validators.required])
        ]),
        notesEng: this.fb.array([
            // this.fb.control('', [Validators.required])
        ]),
        links: this.fb.array([
            // this.fb.group({
            //     website: ['', [Validators.required]],
            //     url: ['', [Validators.required]]
            // })
        ])
    });

    constructor() {
        const url = this.router.url;
        const urlComponent = url.split('/');
        this.titleEng = decodeURI(urlComponent[urlComponent.length - 1]);
    }

    get notesEng() {
        return this.projectForm.get('notesEng') as UntypedFormArray;
    }

    get notesKor() {
        return this.projectForm.get('notesKor') as UntypedFormArray;
    }

    addNote() {
        this.notesEng.push(this.fb.control('', [Validators.required]));
        this.notesKor.push(this.fb.control('', [Validators.required]));
    }

    removeNote(idx: number) {
        this.notesEng.removeAt(idx);
        this.notesKor.removeAt(idx);
    }

    get links() {
        return this.projectForm.get('links') as UntypedFormArray;
    }

    addLink() {
        this.links.push(this.fb.group({
            website: ['', [Validators.required]],
            url: ['', [Validators.required, Validators.pattern('^http[s]?://.+')]]
        }));
    }

    removeLink(idx: number) {
        this.links.removeAt(idx);
    }

    uploadProject() {
        // TODO: Implement project upload functionality
    }
}
