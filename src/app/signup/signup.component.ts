import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  emailValidateBool: Boolean;
  passwordValidateBool: Boolean;
  userNameRequiredBool: Boolean;
  password: string;
  email: string;
  phone: string;
  address: string; 
  username: string;

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
    let passreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (password && passreg.test(password) == true) {
        this.passwordValidateBool = true;
      } else {
        this.passwordValidateBool = false;
      }
  }

  userNameRewuired(username) {
    if(username && username.length > 0){
      this.userNameRequiredBool = true;
    } else {
      this.userNameRequiredBool = false;
    }
  }

  signUp() {
      let obj = {
        "email": this.email,
        "password": this.password,
        "username": this.username,
        "phone": this.phone,
        "address": this.address
      }
      this.signUpDataSave(obj).then(data =>{
        if(data.status== 200) {
          alert('User registered successfully!!');
          this.router.navigateByUrl('/login');
        }
      });
  }

  cancel() {
    this.router.navigateByUrl('/login');
  }

  signUpDataSave(obj) {
    return this.http.post<any>('http://127.0.0.1:8082/demo-login/signup', obj)
      .toPromise()
      .then(res => res)
      .catch(err => err)
  }

}
