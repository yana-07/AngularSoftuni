import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { ITheme } from '../../../core/interfaces';

@Component({
  selector: 'app-theme-list-item',
  templateUrl: './theme-list-item.component.html',
  styleUrls: ['./theme-list-item.component.css']
})
export class ThemeListItemComponent implements OnChanges {

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  canSubscribe$!: Observable<boolean>;

  @Input() theme!: ITheme;

  constructor(private authService: AuthService) { }

  ngOnChanges(): void {
    this.canSubscribe$ = this.authService.currentUser$.pipe(
      map(currentUser => {
        if (!currentUser || !this.theme) {
          return false;
        }

        return !this.theme.subscribers.includes(currentUser._id);
      })
    )
    
  }

}
