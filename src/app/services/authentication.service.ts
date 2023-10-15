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

  loginService(loginObj:any){

    return this.http.post<any>(`${apiUrls.authenticationServiceUrl}login`,loginObj,{ withCredentials: true });
  }

  isLoggedIn(){
    return !!localStorage.getItem('user_id');
  }
}
