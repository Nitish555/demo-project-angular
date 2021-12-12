import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authGuardService: AuthGuardService,
   ) { }


  password: string;
  email: string;
  emailValidateBool: boolean;
  passwordValidateBool: boolean;

  // value = 'SeCuRe!/*.%,#3@+__EnCrYpTiOn_KeY';

  ngOnInit(): void {
  }

  validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(emailField) == false) {
      this.emailValidateBool = false;
    } else {
      this.emailValidateBool = true;
    }
  }

  validatePassword(password) {
    if (password && password.length > 0) {
      this.passwordValidateBool = true;
    } else {
      this.passwordValidateBool = false;
    }
  }

  loginUser() {
    const email = this.email;
    const password = this.password;
    if (this.emailValidateBool && this.passwordValidateBool) {
      let obj = {
        email: this.email,
        password: this.password
      }
      this.authGuardService.login(obj).then(data => {
        if (data.status == 200) {
          let obj = data.results._id;
          this.authGuardService.loginData(obj);
          this.router.navigate(['/dashboard']);
        } else if(data.status== 403) {
          alert("Wrong User Id Or Password!!");
        }

        this.email = undefined;
        this.password = undefined;
        this.emailValidateBool = undefined;
        this.passwordValidateBool = undefined;

      });
    }
  }

  goToSignUp() {
    this.router.navigateByUrl('/signUp');
  }

}
