import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { filter } from 'rxjs/operators';

import { SIDE_NAV_THRESHOLD } from './shared/constants';
import { WindowSizeService } from './shared/services/window-size.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    screenWidth: number;
    sideNavThreshold = SIDE_NAV_THRESHOLD;
    faUser = faUser;
    faGithub = faGithubSquare;
    faLinkedin = faLinkedin;
    url: string;

    constructor(private router: Router, private windowSizeService: WindowSizeService) {
        this.screenWidth = window.innerWidth;
        window.onresize = () => {
            this.windowSizeService.screenWidth = window.innerWidth;
            this.screenWidth = window.innerWidth;
        };
    }

    ngOnInit() {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: any) => {
            this.url = event.url;
        });
    }
}
