import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    private router = inject(Router);
    public authService = inject(AuthService);
    
    email = '';
    password = '';


    signIn() {
        this.authService.signInViaEmail(this.email, this.password)
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
