import { Component, OnInit, inject, TemplateRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { GroundService } from 'src/app/services/ground.service';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { trigger, style, animate, transition, keyframes,} from '@angular/animations';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatchService } from 'src/app/services/match.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-court',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, 
    MatDividerModule, MatIconModule, MatRippleModule, MatFormFieldModule,
    MatInputModule, 
    FormsModule, MatSnackBarModule,
    ReactiveFormsModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatDialogModule],
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

  groundService = inject(GroundService);
  matchService = inject(MatchService);
  authService = inject(AuthenticationService);
  inventory: any = null;
  sports: string[] = ["All","Cricket", "Softball", "Baseball", "Tennis","Field Hockey", "Basketball","Soccer"];
  sportsMaster: string[]=[];
  selectedSports: string[] = [];
  filteredItems: any[] = [];
  courts: any[] =[];
  scheduleMatchCourt: any = null;
  scheduleMatchForm !:FormGroup;
  fb = inject(FormBuilder);
  
  @ViewChild('modalTemplate',  { static: true }) modalTemplate!: TemplateRef<any>;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

  private dialogRef!: MatDialogRef<any, any>;
    

  ngOnInit(): void {
    this.groundService.getGroundsList().subscribe(
      grounds => {  
        this.courts=[...grounds.data];
        this.toggleSportSelection("All");
      },
      error => {
        console.error(error);
      }
    );

    this.matchService.matchChanged.subscribe(()=>{
      this.ngOnInit();
    })

    this.sportsMaster = [...this.sports];
    this.filterItems();
    this.toggleSportSelection("All");
    this.scheduleMatchCourt = this.courts.at(1);
    this.scheduleMatchForm = this.fb.group({});
    this.scheduleMatchForm = this.fb.group({
      sport: [''], // Add more form controls as needed
      selctedMatchdate: new FormControl(new Date()),
      selectedSlot: [''],
    });
    this.generateTimeSlots();
    this.selctedMatchdate = new FormControl(new Date());
    this.minDate =new Date();
  }

  //Start - Filter Helpers

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

  //End - Filter Helpers 

  //for match schedule
  scheduleMatchSport: string = ''; 
  scheduleMatch(court:any){
    this.scheduleMatchCourt = court;
    this.updateDisabledSlots();
    this.scheduleSelectedMatch = this.scheduleMatchCourt.sports
    this.dialogRef = this.dialog.open(this.modalTemplate, {
      width: '450px',
      disableClose: true,
      data: { court: this.scheduleMatchCourt },
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  // Moved
  onCloseClick(): void {
    this.selectedSlots=[];
    this.dialogRef.close();
  }

  onSportSelectionChange(event: any) {
    this.scheduleMatchSport = event.value;
  }

  selectedSlots: string[] = [];
  timeSlots: string[] = [];
  generateTimeSlots(): string[] {
    this.timeSlots = [];
    for (let i = 9; i < 21; i++) { // Adjust the loop according to your needs
      const startTime = this.formatTime(i, 0, true); // Exclude AM/PM for start time
      //const endTime = this.formatTime(i + 1, 0, true); // Include AM/PM only for end time
      this.timeSlots.push(`${startTime}`);
    }
    return this.timeSlots;
  }

  formatTime(hour: number, minute: number, includePeriod: boolean = false): string {
    const period = includePeriod ? (hour >= 12 ? 'PM' : 'AM') : '';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
  }

  toggleSlot(slot: string): void {
    const index = this.selectedSlots.indexOf(slot);
    if (index !== -1) {
      this.selectedSlots.splice(index, 1); // Deselect the slot
    } else {
      this.selectedSlots.push(slot); // Select the slot
    }
  }

  isSelected(slot: string): boolean {
    return this.selectedSlots.includes(slot);
  }

  scheduleSelectedMatch: string = "";
  selctedMatchdate = new FormControl(new Date());
  minDate =new Date();

  disabledSlots: string[] = [];
  onDateChange(){
    this.selectedSlots = [];
    this.updateDisabledSlots();
  }
  updateDisabledSlots() {
    const selectedDate = this.selctedMatchdate.value?.toISOString().split('T')[0];
   
    const selectedDay = this.scheduleMatchCourt.calendar.find((day: any) => day.date === selectedDate);
   
    this.disabledSlots = selectedDay ? selectedDay.slots : [];
  }

  isSlotDisabled(slot: string): boolean {
    return this.disabledSlots.includes(slot);
  }

  async confirmMatch() {
    let owner = await this.authService.getCurrentUser();
    owner = JSON.parse(owner);
    console.log(owner);
    const matchData = {
      owner: owner._id,
      ground: this.scheduleMatchCourt._id,
      date: this.selctedMatchdate.value?.toISOString().split('T')[0],
      slots: this.selectedSlots, // Assume you have a variable to store the selected time slot
      sport: this.scheduleMatchSport, // Assume you have a variable to store the selected sport
    };

    this.matchService.createMatch(matchData).subscribe({
      next: (res) => {
        console.log('Match created successfully');
        this.onCloseClick();
        this.showSuccessSnackbar("You have created a match successfully!", "Dismiss", 5000);
        this.matchService.emitMatchCreated();
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  showSuccessSnackbar(message: string, action: string, duration: number): void {
    const snackBarRef = this.snackBar.open(message, action, {
      duration,
    });
  
    snackBarRef.afterDismissed().subscribe(() => {
    });
  }
}
