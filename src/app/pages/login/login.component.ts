import { CommonModule } from '@angular/common';
import {Component, OnInit, TemplateRef, ViewChild, inject} from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

/** @title Form field with error messages */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule,
     MatInputModule, 
     FormsModule, 
     ReactiveFormsModule, 
     NgIf,
     MatIconModule,
     MatButtonModule,
     MatCardModule,
     MatDialogModule,
    RouterModule],
})
export class LoginComponent implements OnInit{

  fb = inject(FormBuilder);
  authService = inject(AuthenticationService);
  cookie = inject(CookieService);
  router = inject(Router);
  isEmailVerified: boolean = false;
  @ViewChild('verificationSuccessDialog', { static: true }) successDialog!: TemplateRef<any>;
  constructor(private dialog: MatDialog, private route: ActivatedRoute) {}

  loginForm !:FormGroup;
  ngOnInit(): void {

    //console.log(this.route.snapshot.params['verified']);
    this.route.queryParams.subscribe((params) => {
      //console.log(params['verified']);
      this.isEmailVerified = this.route.snapshot.params['verified'] === 'true';
      if(this.isEmailVerified)
        this.openSuccessDialog();
    });
    this.loginForm = this.fb.group({
      email : ['', Validators.compose([Validators.required, Validators.email])],
      password: ['',Validators.required]
    });

    localStorage.removeItem('user_id');
    this.authService.isLoggedIn$.next(false);
  }

  hide = true;
  hiddenError = true;

  login(){
    this.authService.loginService(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        this.hiddenError=true;
        this.authService.setCurrentUser(res.data, res.data._id);
        this.authService.isLoggedIn$.next(true);
        this.loginForm.reset();
        this.router.navigate(['home']);
      },
      error:(err)=>{ 
        this.hiddenError=false;
      }
    })
  }

  openSuccessDialog(): void {
    const dialogRef = this.dialog.open(this.successDialog, {
      data: {  }, 
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.dialog.closeAll();
        this.router.navigate(['/login']);
        
      } else {
        // User clicked 'No' or closed the dialog
        //console.log('Dialog closed or No clicked');
      }
    });
  }

}
