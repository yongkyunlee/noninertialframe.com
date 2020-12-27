import { Component, OnInit } from '@angular/core';
import { AboutContent } from './about.model';
import { AboutService } from './about.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
    language = localStorage.getItem('language') ? localStorage.getItem('language') as string
                                                : 'english';
    aboutContent: AboutContent;

    constructor(private aboutService: AboutService) { }

    ngOnInit() {
        this.aboutService.getAbout().subscribe(data => {
            if (data.length !== 1) {
                console.error('There is an error with the database');
            }
            this.aboutContent = data[0];
            console.log(localStorage.getItem('language'));
        });
    }

    chooseLanguage(language: string) {
        this.language = language;
        localStorage.setItem('language', language);
    }
}
