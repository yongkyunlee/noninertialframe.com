import { Component, OnInit } from '@angular/core';
import { EditProjectComponent } from '../edit-project/edit-project.component';

@Component({
    selector: 'app-new-project',
    templateUrl: '../edit-project/edit-project.component.html',
    styleUrls: ['../edit-project/edit-project.component.scss']
})
export class NewProjectComponent extends EditProjectComponent {
    pageTitle = 'New Project';

}
