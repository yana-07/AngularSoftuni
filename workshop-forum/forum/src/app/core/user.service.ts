import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {
  
  public isLoggedIn: boolean = false;

  constructor(private storage: StorageService) {
    this.isLoggedIn = this.storage.getItem('isLogged')!;
  }

  login(): void {
    this.isLoggedIn = true;
    this.storage.setItem('isLogged', true);
  }

  logout(): void {
    this.isLoggedIn = false;
    this.storage.setItem('isLogged', false);
  }
}
