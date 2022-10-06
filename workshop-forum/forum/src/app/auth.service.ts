import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './core/interfaces';
import { CreateUserdto } from './core/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // the subject should not be exposed to other components, as they should not be able to force it
  // to emit new values
  private _currentUser: Subject<IUser> = new BehaviorSubject<IUser>(undefined as any);

  currentUser$ = this._currentUser.asObservable();
  isLoggedIn$: Observable<boolean> = this.currentUser$.pipe(map(user => !!user));

  constructor(private httpClient: HttpClient) {
  }

  handleLogin(newUser: IUser): void {
    // everyone who has subscribed to the currentUser$ observable will receive the newly emitted value
    this._currentUser.next(newUser);
  }

  handleLogout(): void {
    this._currentUser.next(undefined as any);
  }

  login$(userData: { email: string, password: string }): Observable<IUser> {
    // this.isLoggedIn = true;
    // this.storage.setItem('isLogged', true);

    return this.httpClient
    .post<IUser>(`${environment.apiUrl}/login`, userData, { withCredentials: true, observe: 'response' })
    .pipe(
      tap(response => console.log(response)),
      map(response => response.body as any)
    );
  }

  logout$(): Observable<void> {
    // this.isLoggedIn = false;
    // this.storage.setItem('isLogged', false);

    return this.httpClient
    .post<void>(`${environment.apiUrl}/logout`, {}, { withCredentials: true });
  }

  register$(userData: CreateUserdto): Observable<IUser> {    
      return this.httpClient
      .post<IUser>(`${environment.apiUrl}/register`, userData, { withCredentials: true });
  }

  authenticate$(): Observable<IUser> {
    return this.httpClient
    .get<IUser>(`${environment.apiUrl}/users/profile`, { withCredentials: true })
    .pipe(
      tap(currentProfile => this.handleLogin(currentProfile)),
      catchError(err => {
        return EMPTY; // special type of Observable, which terminates the observable stream
      })
    );
  }
}
