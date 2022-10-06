import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IPost, ITheme } from 'src/app/core/interfaces';
import { ThemeService } from 'src/app/core/theme.service';

@Component({
  selector: 'app-theme-details-page',
  templateUrl: './theme-details-page.component.html',
  styleUrls: ['./theme-details-page.component.css']
})
export class ThemeDetailsPageComponent implements OnInit {

  theme!: ITheme<IPost>;

  isLoggedIn$: Observable<boolean> = this.authservice.isLoggedIn$;
  canSubscribe: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private themeseService: ThemeService,
    private authservice: AuthService) { }

  ngOnInit(): void {
    //const themeId = this.activatedRoute.snapshot.params['themeId'];
    this.activatedRoute.params.subscribe(params => {
      const themeId = params['themeId'];
      this.themeseService.loadThemeById$(themeId).subscribe(theme => {
        this.theme = theme;
        this.canSubscribe = !this.theme.subscribers.includes('5fa64b162183ce1728ff371d');
      })
    }) 
  }

  canLike(comment: IPost): boolean {
    return !comment.likes.includes('5fa64b162183ce1728ff371d');
  }

}
