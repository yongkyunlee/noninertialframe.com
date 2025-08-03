import { Component, inject } from '@angular/core';
import { faTrophy, faMedal, faExternalLinkAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
    faTrophy = faTrophy;
    faMedal = faMedal;
    faLink = faExternalLinkAlt;
    faPencil = faPencilAlt;

    public languageService = inject(LanguageService);

}
