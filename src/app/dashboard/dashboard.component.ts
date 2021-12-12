import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TitleCasePipe } from '@angular/common';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private titleCase: TitleCasePipe,
    private authGuardService: AuthGuardService,
  ) { }

  email: string;
  username: string;
  phone: string;
  address: string;
  userTypeBoolean: Boolean;
  tableData: Array<any> = [];

  ngOnInit(): void {
    this.userData();
  }

  userData() {
    let userId = localStorage.getItem('userId');
    this.getUserProfileDataById(userId).then(data => {
      if(data.status == 200) {
        if(data.results.userType) {
          this.userTypeBoolean = false;
          this.getEditorData(this.userTypeBoolean).then( data => {
            if(data.status === 200 && data.results && data.results.length > 0) {
              this.tableData = data.results;
            } else {
              alert("No data found!!");
            }
          });
        } else {
          this.userTypeBoolean = true;
          this.email = data.results.email;
          this.username = this.titleCase.transform(data.results.username);
          this.phone = data.results.phone;
          this.address = this.titleCase.transform(data.results.address);
        }
      }
    });
  } 

  goToUserProfile(id) {
    this.getUserProfileDataById(id).then(data => {
      this.userTypeBoolean = true;
      this.email = data.results.email;
      this.username = this.titleCase.transform(data.results.username);
      this.phone = data.results.phone;
      this.address = this.titleCase.transform(data.results.address);
    });
  }

  GoToList() {
    this.userTypeBoolean = false;
  }

  Logout() {
    this.authGuardService.logout();
  }

  updateData() {
    this.updateUserProfileByEmail().then(data => {
      if(data.status === 200) {
        alert("Profile Updated successfully !!");
      } else {
        alert("Profile not updated!!");
      }
      this.userData();
    });
  }

  getUserProfileDataById(id) {
    return this.http.get<any>('http://127.0.0.1:8082/demo-login/getUserDataById/' + id)
      .toPromise()
      .then(res => res)
      .catch(err => err)
  }

  getEditorData(userType) {
    return this.http.get<any>('http://127.0.0.1:8082/demo-login/getUserData/' + userType)
    .toPromise()
    .then(res => res)
    .catch(err => err)
  }

  updateUserProfileByEmail() {
    let obj = {
      phone: this.phone,
      address: this.address,
      email: this.email
    }
    return this.http.post<any>('http://127.0.0.1:8082/demo-login/updateUserProfile', obj)
    .toPromise()
    .then(res => res)
    .catch(err => err)
  }
}
