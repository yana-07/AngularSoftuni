import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  get currentUser(): IUser {
    return this.userService.currentUser;
  }

  constructor(public userService: UserService) { }

  logoutHandler(): void {
    this.userService.logout();
  }
}
