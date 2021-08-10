import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public loggedIn: boolean = false;

  constructor( private router: Router, auth: AuthService) {
    this.loggedIn = auth.isLoggedIn;
  }

  ngOnInit(): void {
    console.log(this.loggedIn)

    if (!this.loggedIn) this.router.navigateByUrl('/profile/login');
    if (this.loggedIn) this.router.navigateByUrl('/profile/dashboard');

  }

}
