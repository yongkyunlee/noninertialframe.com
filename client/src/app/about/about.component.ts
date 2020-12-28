import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../shared/services/language.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss', '../shared/styles/languages.scss']
})
export class AboutComponent implements OnInit, AfterViewInit {
    fragment: string;

    constructor(
        public languageService: LanguageService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
    }

    ngAfterViewInit() {
        try {
            document.querySelector('#' + this.fragment)?.scrollIntoView();
        } catch (e) {}
    }
}
