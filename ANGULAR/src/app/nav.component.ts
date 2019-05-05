import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
 
@Component({
    selector: 'navigation',
    templateUrl: './nav.component.html',
    styleUrls: []
})

export class NavComponent {

    userImage: string;
    home = this.router.navigate['/'];

    constructor(private authService: AuthService,
                private router: Router) { }

    ngOnInit() {
        this.authService.userImageChange$.subscribe(image => this.userImage = image);
    }

    back() {
        window.history.back();
    }

    profile(){
        this.router.navigate(['/profile']);
    }
}