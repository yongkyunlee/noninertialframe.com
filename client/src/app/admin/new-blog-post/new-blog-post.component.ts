import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-new-blog-post',
    templateUrl: './new-blog-post.component.html',
    styleUrls: ['./new-blog-post.component.scss']
})
export class NewBlogPostComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        if (!this.authService.isAdmin) {
            // this.router.navigate(['/']);
            // console.log(this.authService.)
        }
    }

}
