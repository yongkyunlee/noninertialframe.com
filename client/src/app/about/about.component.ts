import { Component } from '@angular/core';
import { LanguageService } from '../shared/services/language.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss', '../shared/styles/languages.scss']
})
export class AboutComponent {

    constructor(public languageService: LanguageService) { }
}
