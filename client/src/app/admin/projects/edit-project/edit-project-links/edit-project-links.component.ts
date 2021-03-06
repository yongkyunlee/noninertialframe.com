import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-edit-project-links',
    templateUrl: './edit-project-links.component.html',
    styleUrls: ['./edit-project-links.component.scss']
})
export class EditProjectLinksComponent{
    @Input() linkForm: FormGroup;
}
