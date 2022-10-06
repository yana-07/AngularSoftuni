import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { IUser } from './interfaces';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      // catchError(err => {
      //   // Promise.resolve
      //   return of(undefined as any);
      // }),
      tap(event => { // only listening for the data coming through the next handler (all events that are not error events)
        if (event instanceof HttpResponse) {
          // localhost:3000/api/login || localhost:3000/api/register
          if (event.url?.endsWith('login') || event.url?.endsWith('register')) {
            const newlyLoggedUser: IUser = event.body as any;
            this.authService.handleLogin(newlyLoggedUser);
          } else if (event.url?.endsWith('logout')) {
            this.authService.handleLogout();
          }
        }
      }));
  }
}
