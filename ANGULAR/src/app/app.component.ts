import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-title',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  constructor(private authService: AuthService) {
    authService.handleAuthentication();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.renewTokens();
    }
  }
}
