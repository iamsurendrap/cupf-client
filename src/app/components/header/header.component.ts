import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  
  authService = inject(AuthenticationService);
  isLoggedIn:boolean = this.authService.isLoggedIn();

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(res=>{
      this.isLoggedIn = this.authService.isLoggedIn();
    })
  }
  logout(){
    localStorage.removeItem('user_id');
    this.authService.isLoggedIn$.next(false);
  }
  

}
