import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faUser, faPencilAlt, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-regular-svg-icons';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { filter } from 'rxjs/operators';

import { SIDE_NAV_THRESHOLD } from './shared/constants';
import { WindowSizeService } from './shared/services/window-size.service';

declare let gtag: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    screenWidth: number;
    sideNavThreshold = SIDE_NAV_THRESHOLD;
    faUser = faUser;
    faFile = faFileAlt;
    faPencilAlt = faPencilAlt;
    faProjectDiagram = faProjectDiagram;
    faGithub = faGithubSquare;
    faLinkedin = faLinkedin;
    url: string;
    isSidenavExpanded = false;

    constructor(private router: Router, private windowSizeService: WindowSizeService) {
        this.screenWidth = window.innerWidth;
        window.onresize = () => {
            this.windowSizeService.screenWidth = window.innerWidth;
            this.screenWidth = window.innerWidth;
        };
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                gtag('config', 'UA-131043814-1', {
                    page_path: event.urlAfterRedirects
                });
            }
        });
    }

    ngOnInit() {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: any) => {
            this.url = event.url;
        });
    }

    toggleSidenav() {
        this.isSidenavExpanded = !this.isSidenavExpanded;
    }
}
