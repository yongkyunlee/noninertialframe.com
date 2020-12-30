import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    email = '';
    password = '';

    constructor(
        private router: Router,
        public authService: AuthService
    ) { }

    ngOnInit(): void {
    }

    signIn() {
        this.authService.signIn(this.email, this.password)
            .then(() => {
                this.router.navigate(['/admin']);
            })
            .catch(err => {
                alert(err);
            });
    }

    signOut() {
        this.authService.signOut();
    }

}
