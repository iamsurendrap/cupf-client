import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatchService } from 'src/app/services/match.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-available-matches',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatDialogModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './available-matches.component.html',
  styleUrls: ['./available-matches.component.scss']
})
export class AvailableMatchesComponent implements OnInit{

  @ViewChild('joinMatchDialog', { static: true }) joinMatchDialog!: TemplateRef<any>;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}
  
  matchService = inject(MatchService);
  authService = inject(AuthenticationService);

  availableMatches: any[] = [];

  ngOnInit(): void {
    let currentUser = this.authService.getCurrentUser();
    currentUser = JSON.parse(currentUser);
    this.matchService.getAllMatches(currentUser._id).subscribe(
      matches => {
        this.availableMatches = matches.data.matches;
        // Assuming you have a method to get the current date and time
        const currentDateTime = new Date();

        // Filter out matches that are past the current date and time
        this.availableMatches = this.availableMatches.filter(match => {
          const matchDateTime = new Date(match.date + ' ' + match.slots[0]); // Assuming slots is an array of strings

          return matchDateTime > currentDateTime;
        }); 
        ////console.log(this.availableMatches)
      },
      error => {
        console.error(error);
      }
    );
    this.matchService.matchChanged.subscribe(()=>{
      this.ngOnInit();
    })
  }

  openJoinMatchDialog(match: any): void {
    const dialogRef = this.dialog.open(this.joinMatchDialog, {
      data: { match }, 
      width: '400px', 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // User clicked 'Yes', proceed with dropping the match
        this.joinMatch(match);
      } else {
        // User clicked 'No' or closed the dialog
        ////console.log('Dialog closed or No clicked');
      }
    });
  }

  async joinMatch(match: any): Promise<void> {
    let owner = await this.authService.getCurrentUser();
    owner = JSON.parse(owner);
    //console.log(owner);
    const matchData = {
      userId: owner._id,
      matchId: match._id
    };
    this.matchService.joinMatch(matchData).subscribe({
      next: (res) => {
        this.showSuccessSnackbar('You have successfully joined the match!', 'Dismiss', 5000);
        this.matchService.emitMatchJoined();
      },
      error: (err) => {
        ////console.log(err.message);
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
