import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../api.urls';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  http= inject(HttpClient);
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  private currentUser: any; // Store user information here

  setCurrentUser(user: any, userid: any) {
    // Store the user information in currentUser
    this.currentUser = user;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem('user_id',userid);
  }

  resetCurrentUser() {
    // Clear the user information
    this.currentUser = null;
    localStorage.removeItem("user")
  }

  getCurrentUser() {
    this.currentUser = localStorage.getItem("user");
    return this.currentUser;
  }

  loginService(loginObj:any){
    return this.http.post<any>(`${apiUrls.authenticationServiceUrl}login`,loginObj,{ withCredentials: true });
  }

  isLoggedIn(){
    return !!localStorage.getItem('user_id');
  }
}
