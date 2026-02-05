import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/credentials/auth.service";
import {Router} from "@angular/router";
import {AccRequestService} from "../../services/account/acc-request.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isBurgerOn: boolean = false;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService,
              private httpAcc: AccRequestService,
              private router: Router) {
  }


  ngOnInit(): void {

    this.authService.isLoggedIn$.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
    this.httpAcc.isAdmin$.subscribe((admin: boolean) => {
      this.isAdmin = admin;
    })
  }

  activeBuger() {
    this.isBurgerOn = !this.isBurgerOn;
  }

  logout(): void {
    this.authService.logout();
    this.httpAcc.isAdmin.next(false)
    this.router.navigate(['/login']);
  }

  logoutBurg(): void {
    this.authService.logout();
    this.httpAcc.isAdmin.next(false)
    this.activeBuger();
    this.router.navigate(['/login']);
  }


}
