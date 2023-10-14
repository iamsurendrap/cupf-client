import { CommonModule } from '@angular/common';
import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

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
     MatCardModule],
})
export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  passwordFormControl = new FormControl('',[Validators.required])

  hide = true;

  getErrorMessage() {
    if (this.emailFormControl.hasError('required') || this.passwordFormControl.hasError('reuired')) {
      return 'You must enter a value';
    }

    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }
}
