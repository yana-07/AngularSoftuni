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

export interface IUpdateUserDto extends Pick<IUser, 'username' | 'email' | 'tel'> {
  profilePicture?: File;
}

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getProfile$(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.apiUrl}/users/profile`, { withCredentials: true });
  }

  updateProfile$(newUser: IUpdateUserDto): Observable<IUser> {
    const formData = new FormData();
    formData.set('username', newUser.username);
    formData.set('email', newUser.email);
    formData.set('tel', newUser.tel);

    if (!!newUser.profilePicture) {
      formData.append('profilePicture', newUser.profilePicture)
    }

    return this.httpClient.put<IUser>(`${environment.apiUrl}/users/profile`, formData, { withCredentials: true })
  }
}
