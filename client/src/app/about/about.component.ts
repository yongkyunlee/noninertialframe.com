import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
    language = localStorage.getItem('language') ? localStorage.getItem('language') as string
                                                : 'english';

    constructor() { }

    ngOnInit() {
    }

    chooseLanguage(language: string) {
        this.language = language;
        localStorage.setItem('language', language);
    }
}
