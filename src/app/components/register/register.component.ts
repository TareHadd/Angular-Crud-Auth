import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Auth } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerErrors = '';

  signupForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
   }

  get controls(){
    return this.signupForm.controls;
  }

  ngOnInit(): void {
  }

  //emailToSend = this.controls.email.value;
 // passToSend = this.controls.password.value

  onSignup()
  {
    if(!this.signupForm.valid)
    {
      return;
    }
    this.authService.onSignupFunct(this.controls.email.value, this.controls.password.value)
    .subscribe(
      responseData => {
        console.log(responseData);
      },
      error => {
        this.registerErrors = error;
      }
    )

    this.router.navigate(['']);
  }

}
