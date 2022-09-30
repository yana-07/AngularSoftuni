import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IPost, ITheme, IUser } from './interfaces/index';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable()
export class ThemeService {

  constructor(private http: HttpClient) { }

  loadThemeList$(): Observable<ITheme[]> {
    return this.http.get<ITheme[]>(`${apiUrl}/themes`); 
  }

  loadThemeById$(id: string): Observable<ITheme<IPost>> {
    return this.http.get<ITheme<IPost>>(`${apiUrl}/themes/${id}`); 
  }
}
