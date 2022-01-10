import { Component } from "@angular/core";

import { LanguageService } from "../shared/services/language.service";

@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html',
    styleUrls: ['./resume.component.scss', '../shared/styles/languages.scss']
})
export class ResumeComponent {
    constructor(
        public languageService: LanguageService
    ) { }
}