import { Component, OnInit } from '@angular/core';
import { UserLoginService } from '../services/user-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.css']
})
export class LandingHomeComponent implements OnInit {

  constructor(
    private userLogin: UserLoginService,
    private router: Router
  ) { }

  ngOnInit() {
    return this.userLogin.isAuthenticatedObservable()
      .subscribe(x => {
        if (x) {
          this.router.navigate(['projects'])
        }
      })
  }

}
