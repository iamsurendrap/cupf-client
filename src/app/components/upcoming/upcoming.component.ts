import { Component, OnInit, inject, TemplateRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatchService } from 'src/app/services/match.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatDialogModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit{

  @ViewChild('dropMatchDialog', { static: true }) dropMatchDialog!: TemplateRef<any>;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar ){}

  matchService = inject(MatchService);
  authService = inject(AuthenticationService);

  scheduled: any[] = [];


  openDropMatchDialog(match: any): void {
    const dialogRef = this.dialog.open(this.dropMatchDialog, {
      data: { match }, 
      width: '400px', 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // User clicked 'Yes', proceed with dropping the match
        this.dropMatch(match);
      } else {
        // User clicked 'No' or closed the dialog
        //console.log('Dialog closed or No clicked');
      }
    });
  }

  async dropMatch(match: any): Promise<void> {
    let owner = await this.authService.getCurrentUser();
    owner = JSON.parse(owner);
    //console.log(owner);
    const matchData = {
      userId: owner._id,
      matchId: match._id
    };
    this.matchService.dropMatch(matchData).subscribe({
      next: (res) => {
        //console.log('success');
        this.showSuccessSnackbar('You have successfully dropped from the match!', 'Dismiss', 5000);
        this.matchService.emitMatchDropped();
      },
      error: (err) => {
        //console.log(err.message);
      },
    });
  }

  ngOnInit(): void {
    let currentUser = this.authService.getCurrentUser();
    currentUser = JSON.parse(currentUser);
    this.matchService.getMatches(currentUser._id).subscribe(
      matches => {
        this.scheduled = matches.data.matches;
        // Assuming you have a method to get the current date and time
        const currentDateTime = new Date();

        // Filter out matches that are past the current date and time
        this.scheduled = this.scheduled.filter(match => {
          const matchDateTime = new Date(match.date + ' ' + match.slots[0]); // Assuming slots is an array of strings

          return matchDateTime > currentDateTime;
        }); 

        //console.log(this.scheduled)
      },
      error => {
        console.error(error);
      }
    );

    this.matchService.matchChanged.subscribe(()=>{
      this.ngOnInit();
    })

  }

  showSuccessSnackbar(message: string, action: string, duration: number): void {
    const snackBarRef = this.snackBar.open(message, action, {
      duration,
    });
  
    snackBarRef.afterDismissed().subscribe(() => {
    });
  }

}
