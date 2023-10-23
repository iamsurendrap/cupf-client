import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ScheduledmatchesService } from 'src/app/services/scheduledmatches.service';

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit{

  upcomingMatchService = inject(ScheduledmatchesService);

  scheduled: any = null;

  ngOnInit(): void {
   this.scheduled = this.upcomingMatchService.getScheduledMatches("1");

  }

}
