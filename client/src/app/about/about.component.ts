import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../shared/services/language.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss', '../shared/styles/languages.scss']
})
export class AboutComponent implements OnInit, AfterViewInit {
    fragment: string | null = null;
    
    public languageService = inject(LanguageService);
    private route = inject(ActivatedRoute);

    ngOnInit() {
        this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
    }

    ngAfterViewInit() {
        try {
            if (this.fragment) {
                document.querySelector('#' + this.fragment)?.scrollIntoView();
            }
        } catch {
            // Ignore scroll errors
        }
    }
}
