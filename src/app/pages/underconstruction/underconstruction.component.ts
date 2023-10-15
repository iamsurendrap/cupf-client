import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-underconstruction',
  standalone: true,
  imports: [CommonModule,
  RouterModule
  ],
  templateUrl: './underconstruction.component.html',
  styleUrls: ['./underconstruction.component.scss']
})
export class UnderconstructionComponent {

}
