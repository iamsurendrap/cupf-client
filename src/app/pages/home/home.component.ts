import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourtComponent } from 'src/app/components/court/court.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CourtComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
