import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './interfaces';
import { StorageService } from './storage.service';

export interface CreateUserdto {
  username: string;
  email: string,
  password: string,
  tel?: string 
}

@Injectable()
export class UserService {

  currentUser! : IUser;
  
  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  constructor(
    private storage: StorageService,
    private httpClient: HttpClient) {
      //this.isLoggedIn = this.storage.getItem('isLogged')!;
  }

  login$(userData: { email: string, password: string }): Observable<IUser> {
    // this.isLoggedIn = true;
    // this.storage.setItem('isLogged', true);

    return this.httpClient
    .post<IUser>(`${environment.apiUrl}/login`, userData, { withCredentials: true, observe: 'response' })
    .pipe(
      tap(response => console.log(response)),
      map(response => response.body as any),
      tap(user => this.currentUser = user)
    );
  }

  logout(): void {
    // this.isLoggedIn = false;
    // this.storage.setItem('isLogged', false);
  }

  register$(userData: CreateUserdto): Observable<IUser> {    
      return this.httpClient.post<IUser>(`${environment.apiUrl}/register`, userData, { withCredentials: true });
  }

  getProfile$(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.apiUrl}/users/profile`, { withCredentials: true })
    .pipe(tap(user => this.currentUser = user));
  }
}
