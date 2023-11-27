import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpcomingComponent } from 'src/app/components/upcoming/upcoming.component';
import { CourtComponent } from 'src/app/components/ground/court.component';
import { AvailableMatchesComponent } from "../../components/available-matches/available-matches.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [CommonModule, CourtComponent, UpcomingComponent, AvailableMatchesComponent]
})
export class HomeComponent {

}
