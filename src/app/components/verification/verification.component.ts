import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";


@Component({
    selector: 'app-verification',
    templateUrl: './verification.component.html',
    standalone: true,
    template: `
    <p>
      verification works!
    </p>
  `,
    styleUrls: ['./verification.component.scss'],
    imports: [CommonModule, LoadingSpinnerComponent]
})
export class VerificationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  isLoading = true;

  ngOnInit(): void {
    //console.log('hit');
    this.route.queryParams.subscribe((params) => {
      const token = this.route.snapshot.params['token'];
      //console.log(token);
      if (token) {
        this.authService.verify(token).subscribe(
          (res) => {
            //console.log('Email verification successful', res);
            this.isLoading = false;
            this.router.navigate(['/login/true']);
          },
          (error) => {
            console.error('Email verification error', error);
          }
        );
      }
    });
  }
}
