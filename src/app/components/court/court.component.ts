import { Component, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { InventoryService } from 'src/app/services/inventory.service';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-court',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, MatRippleModule],
  animations: [
    trigger('fade', [
      transition('* => *', [
        animate(1100, keyframes([
          style({opacity: 0, transform: 'translateY(-50%)', offset: 0}),
          style({opacity: 1, transform: 'translateY(0%)', offset: 1})
        ]))
      ])
    ])
  ],
  templateUrl: './court.component.html',
  styleUrls: ['./court.component.scss']
})
export class CourtComponent implements OnInit {

  inventoryService = inject(InventoryService);

  inventory: any = null;
  sports: string[] = ["All"];
  selectedSports: string[] = [];
  filteredItems: any[] = [];
  courts: any[] =[];

  ngOnInit(): void {
    this.inventory = this.inventoryService.getInventory();
    this.sports.push(...this.inventory.sports);
    this.courts = this.inventory.courts;
    this.filterItems();
    this.toggleSportSelection("All");
  }

  toggleSportSelection(sport: string) {
    if (sport === 'All') {
      this.selectedSports = ['All'];
    } else {
      if (this.selectedSports.includes('All')) {
        this.selectedSports = this.selectedSports.filter(s => s !== 'All');
      }
      if (this.selectedSports.includes(sport)) {
        this.selectedSports = this.selectedSports.filter(s => s !== sport);
      } else {
        this.selectedSports.push(sport);
      }
    }

    if(this.selectedSports.length ===0)
    {
      this.selectedSports = ['All'];
    }

    this.filterItems();
  }


  filterItems() {
    if (this.selectedSports.includes('All')) {
      this.filteredItems = this.courts; // Show all items when "All" is selected
    } else {
      this.filteredItems = this.courts.filter(item =>
        this.selectedSports.some(selectedSport => item.sports.includes(selectedSport))
      );
    }
  }


  reorganizeButtons() {
    this.sports.sort((a, b) => {
      if (this.selectedSports.includes(a)) {
        return -1;
      } else if (this.selectedSports.includes(b)) {
        return 1;
      }
      return 0;
    });
  }

  animationState: string = 'in';

  moveButton(index: number) {
    this.animationState = 'out';
    setTimeout(() => {
      //this.reorganizeButtons();
      this.animationState = 'in';
    }, 400);
  }
}
