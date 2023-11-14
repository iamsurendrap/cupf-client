import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild, inject} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgFor, AsyncPipe} from '@angular/common';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';


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
    FormsModule,
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
    MatDialogModule
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
  filteredSports: Observable<string[]>;
  sports: string[] = ['Cricket'];
  allSports: string[] = ['Cricket', 'Softball', 'Baseball', 'Tennis', 'Field Hockey', 'Baseball', 'Soccer'];

  @ViewChild('sportInput')
  sportInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);
  passwordMatchValidator: any;
  dialog: any;

  constructor() {
    this.filteredSports = this.sportCtrl.valueChanges.pipe(
      startWith(null),
      map((sport: string | null) => (sport ? this._filter(sport) : this.allSports.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our sport
    if (value) {
      this.sports.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.sportCtrl.setValue(null);
  }

  remove(sport: string): void {
    const index = this.sports.indexOf(sport);

    if (index >= 0) {
      this.sports.splice(index, 1);

      this.announcer.announce(`Removed ${sport}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.sports.push(event.option.viewValue);
    this.sportInput.nativeElement.value = '';
    this.sportCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSports.filter(sport => sport.toLowerCase().includes(filterValue));
  }

  fb = inject(FormBuilder);
  authService = inject(AuthenticationService);
  cookie = inject(CookieService);
  router = inject(Router);

  registrationForm !:FormGroup;
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email : ['', Validators.compose([Validators.required, Validators.email])],
      //password: ['',Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      clarkid: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    },
    { validators: this.passwordMatchValidator }
    );
    
    localStorage.removeItem('user_id');
    this.authService.isLoggedIn$.next(false);
  }

  hide = true;
  hiddenError = true;

  registration(){
    if (this.registrationForm.valid) {
      // Assuming you want to collect the form data and display it in the console
      const formData = this.registrationForm.value;
      console.log('Registration Form Data:', formData);

      // You can send the form data to your backend server for further processing and registration.
      // Make an HTTP POST request to your registration endpoint here.
      
      // Reset the form
      this.registrationForm.reset();

      // Display the success message
      this.showSuccessPopup = true;
    }
  }

  showSuccessPopup: boolean = false;

//constructor(private router: Router) {}

  registerUser() {
    // Handle registration logic here (e.g., make an API call).
    // Once registration is successful, set showSuccessPopup to true.
    this.showSuccessPopup = true;
  }

  redirectToregisterPage() {
    // Redirect to the register page
    this.router.navigate(['/register']);
  }

  

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}

export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
}