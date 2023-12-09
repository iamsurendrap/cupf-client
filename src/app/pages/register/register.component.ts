import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, AbstractControl, FormGroupDirective, NgForm, ValidatorFn, ValidationErrors } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild, inject } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ErrorStateMatcher } from '@angular/material/core';



@Component({
  selector: 'RegisterComponent',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatChipsModule,
    NgFor,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


/**
 * @title RegisterComponent
 */

export class RegisterComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  sportCtrl = new FormControl('');  

  favorites = new FormControl('');
  sportsList: string[] =  ['Cricket', 'Softball', 'Baseball', 'Tennis', 'Field Hockey', 'Baseball', 'Soccer'];
  @ViewChild('registrationSuccessDialog', { static: true }) successDialog!: TemplateRef<any>;
  constructor(private dialog: MatDialog,private fb: FormBuilder) {}

  authService = inject(AuthenticationService);
  cookie = inject(CookieService);
  router = inject(Router);

  registrationForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  private registrationSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      firstName: ['', Validators.compose([Validators.required, this.noNumbersOrSpecialChars])],
      lastName: ['', Validators.compose([Validators.required, this.noNumbersOrSpecialChars])],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', Validators.required],
      favorites:['',atLeastOneValidator]
    }, {
      validators: this.checkPasswords
    });
  }
  
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    //console.log('Form group:', group.value);
    let pass = group.controls['password'].value;
    let confirmPass = group.controls['cpassword'].value;

    return pass === confirmPass ? null : { notSame: true }
  }
  
  isControlTouched(controlName: string): boolean {
    const control = this.registrationForm.get(controlName);
    return control ? control.touched : false;
  }
  
  
  noNumbersOrSpecialChars(control: AbstractControl): { [key: string]: boolean } | null {
    const pattern = /^[a-zA-Z]+$/; // Regular expression to allow only letters
    if (!pattern.test(control.value)) {
      return { 'noNumbersOrSpecialChars': true };
    }
    return null;
  }

  hide = true;
  hiddenError = true;

  registration() {
    
    if (this.registrationSubscription) {
      this.registrationSubscription.unsubscribe();
    }
    this.registrationSubscription =  this.authService.register(this.registrationForm.value)
    .subscribe({
      next:(res)=>{
        this.hiddenError=true;
        this.openSuccessDialog();
      },
      error:(err)=>{ 
        this.hiddenError=false;
        //console.log(err);
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

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent?.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

// Custom validator function
export const atLeastOneValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const selectedOptions = control.value as string[];

  // Check if at least one option is selected
  return selectedOptions && selectedOptions.length > 0 ? null : { atLeastOne: true };
};
