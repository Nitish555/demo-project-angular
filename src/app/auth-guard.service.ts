import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (localStorage.getItem('userId')) {
			return true;
		}
    this.logout()
		return false;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }

  loginData(obj) {
    localStorage.setItem("userId", obj);
  }

  login(obj) {
    return this.http.post<any>('http://127.0.0.1:8082/demo-login/login', obj)
      .toPromise()
      .then(res => res)
      .catch(err => err)

  }

  logout() {
		localStorage.clear();
		this.router.navigate(['/login']);
	}

}

