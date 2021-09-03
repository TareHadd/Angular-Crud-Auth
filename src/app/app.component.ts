import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tour-of-heroes';

  constructor(private authService: AuthService, private router:Router){}

    // to have info is user logged or not
    loginUserSubscription = new Subscription;
    // To use that data in boolean
    isLogged = false;

  ngOnInit() {
    this.authService.autoLogin();
    this.loginUserSubscription = this.authService.user.subscribe(user => {
      this.isLogged = !user ? false : true;
    });
  }

  ngOnDestroy(){
    this.loginUserSubscription.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }
}
