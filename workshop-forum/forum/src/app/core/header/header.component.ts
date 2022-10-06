import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IUser } from '../interfaces';
import { Message, MessageBusService, MessageType } from '../message-bus.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  currentUser$: Observable<IUser> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  message!: string;
  isMessageError!: boolean;

  private subscription!: Subscription;

  private isLoggingOut: boolean = false;

  constructor(
    public authService: AuthService,
    private messageBus: MessageBusService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.messageBus.onNewMessage$.subscribe(newMessage => {
      this.message = newMessage?.text || '';
      this.isMessageError = newMessage?.type === MessageType.Error;

      // Beware of recursion
      if (!!this.message) {
        console.log('timeOut')
        setTimeout(() => {
          this.messageBus.clear();
        }, 5000);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logoutHandler(): void {
    if (this.isLoggingOut) {
      return;
    }

    this.isLoggingOut = true;

    this.authService.logout$().subscribe({
      next: args => { // response will be emitted in the next() handle in http requests
        console.log(args);
      },
      complete: () => { // when the request completes (called after the next() handle in http requests)
        this.isLoggingOut = false;     
        this.router.navigate(['/home']);
      },
      error: () => {
        this.isLoggingOut = false;  
      }
    });
  }
}
