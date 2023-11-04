import { CommonModule } from '@angular/common';
import {Component, OnInit, inject} from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule, 
    FormsModule, 
    ReactiveFormsModule, 
    NgIf,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
   RouterModule,
   CommonModule,
  ],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})


export class ForgotpasswordComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthenticationService);
  cookie = inject(CookieService);
  router = inject(Router);

  forgotForm !:FormGroup;
  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email : ['', Validators.compose([Validators.required, Validators.email])],
      clarkid: ['',Validators.required]
    });


    localStorage.removeItem('user_id');
    this.authService.isLoggedIn$.next(false);
  }

  hide = true;
  hiddenError = true;

  submit(){
    this.authService.forgotService(this.forgotForm.value)
    .subscribe({
      next:(res)=>{
        this.hiddenError=true;
        this.authService.setCurrentUser(res.data, res.data._id);
        this.authService.isLoggedIn$.next(true);
        this.forgotForm.reset();
        this.router.navigate(['login']);
      },
      error:(err)=>{ 
        this.hiddenError=false;
      }
    })
  }
}
