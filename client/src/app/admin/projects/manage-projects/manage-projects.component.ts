import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProjectSnippet } from 'src/app/projects/projects.model';
import { ProjectsService } from 'src/app/projects/projects.service';

@Component({
    selector: 'app-manage-projects',
    templateUrl: './manage-projects.component.html',
    styleUrls: ['./manage-projects.component.scss']
})
export class ManageProjectsComponent implements OnInit {
    projects: ProjectSnippet[];
    searchControl = new FormControl();
    options: string[];
    filteredOptions$: Observable<string[]>;
    filteredProjects$: Observable<ProjectSnippet[]>;

    constructor(private projectsService: ProjectsService) { }

    ngOnInit() {
        this.projectsService.getProjects().subscribe(data => {
            this.projects = data;
        });

        this.filteredOptions$ = this.searchControl.valueChanges.pipe(
            map(value => this._filterOption(value))
        );

        this.filteredProjects$ = this.searchControl.valueChanges.pipe(
            map(value => this._filterProject(value))
        );
    }

    private _filterOption(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option =>
            option.toLowerCase().includes(filterValue)
        );
    }

    private _filterProject(value: string): ProjectSnippet[] {
        const filterValue = value.toLowerCase();
        return this.projects.filter(blogPost =>
            blogPost.titleEng.toLowerCase().includes(filterValue)
        );
    }
}
