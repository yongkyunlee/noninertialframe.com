import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs/operators';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    screenWidth: number;
    sideNavThreshold = 600;
    faUser = faUser;
    url: string;

    constructor(private router: Router) {
        this.screenWidth = window.innerWidth;
        window.onresize = () => {
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
