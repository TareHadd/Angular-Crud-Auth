import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Auth } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  loginForm!: FormGroup;
  erorrs = '';



  constructor(private authService: AuthService, private router:Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
   }

  get controls(){
    return this.loginForm.controls;
  }

  // ngOnInit() {
  //   this.loginUserSubscription = this.authService.user.subscribe(user => {
  //     this.isLogged = !user ? false : true;
  //   });
  // }

  // ngOnDestroy(){
  //   this.loginUserSubscription.unsubscribe();
  // }

  //emailToSend = this.controls.email.value;
 // passToSend = this.controls.password.value

  login()
  {
    if(!this.loginForm.valid)
    {
      return;
    }
    this.authService.onLogin(this.controls.email.value, this.controls.password.value)
    .subscribe(
      responseData => {
        console.log(responseData);
        this.router.navigate(['./main']);
      },
      error => {
        console.log(error);
        this.erorrs = error;
      }
    )
    this.loginForm.reset();
  }

}
