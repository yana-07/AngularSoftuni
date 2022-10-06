import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { IPost, ITheme, IUser } from './interfaces/index';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable()
export class ThemeService {

  constructor(private http: HttpClient) { }

  addTheme$(body: { themeName: string, postText: string }): Observable<ITheme> {
    return this.http.post<ITheme>(`${environment.apiUrl}/themes`, body, { withCredentials: true });
  }

  loadThemeList$(searchTerm: string = ''): Observable<ITheme[]> {
    return this.http.get<ITheme[]>(`${apiUrl}/themes?title=${searchTerm}`, { // or ?title={searchTerm}
      params: new HttpParams({
        fromObject: {         
        }
      })
    }); 
  }

  loadThemeById$(id: string): Observable<ITheme<IPost>> {
    return this.http.get<ITheme<IPost>>(`${apiUrl}/themes/${id}`); 
  }
}
