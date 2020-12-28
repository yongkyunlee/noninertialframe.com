import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
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

    projectForm = this.fb.group({
        titleEng: ['', [Validators.required]],
        titleKor: ['', [Validators.required]],
        descriptionEng: ['', [Validators.required]],
        descriptionKor: ['', [Validators.required]],
        date: ['', [Validators.required, Validators.pattern('^\\d\\d\\d\\d\-\\d\\d\-\\d\\d$')]],
        notesKor: this.fb.array([
            this.fb.control('', [Validators.required])
        ]),
        notesEng: this.fb.array([
            this.fb.control('', [Validators.required])
        ]),
        links: this.fb.array([
            this.fb.group({
                website: ['', [Validators.required]],
                url: ['', [Validators.required]]
            })
        ])
    });

    constructor(
        protected fb: FormBuilder,
        protected router: Router,
        protected projectService: ProjectsService
    ) { }

    get notesEng() {
        return this.projectForm.get('notesEng') as FormArray;
    }

    get notesKor() {
        return this.projectForm.get('notesKor') as FormArray;
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
        return this.projectForm.get('links') as FormArray;
    }

    addLink() {
        this.links.push(this.fb.group({
            website: ['', [Validators.required]],
            url: ['', [Validators.required]]
        }));
    }

    removeLink(idx: number) {
        this.links.removeAt(idx);
    }

    uploadProject() { }
}
