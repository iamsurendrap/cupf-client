import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule,MatIconModule,MatMenuModule, MatButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  
  currentUser:any;
  username:any;
  authService = inject(AuthenticationService);
  router = inject(Router);
  isLoggedIn:boolean = this.authService.isLoggedIn();


  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(res=>{
      this.isLoggedIn = this.authService.isLoggedIn();
      this.currentUser = this.authService.getCurrentUser();
      this.currentUser = JSON.parse(this.currentUser);
    })
  }
  logout(){
    this.authService.resetCurrentUser();
    localStorage.removeItem('user_id');
    this.authService.isLoggedIn$.next(false);
  }
  

}
