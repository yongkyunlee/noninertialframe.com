import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    email = '';
    password = '';

    constructor(public authService: AuthService) { }

    ngOnInit(): void {
    }

    signIn() {
        this.authService.signIn(this.email, this.password, '/admin');
    }

    signOut() {
        this.authService.signOut();
    }

}
