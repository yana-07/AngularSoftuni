import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, mergeMap, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IPost, ITheme, IUser } from 'src/app/core/interfaces';
import { ThemeService } from 'src/app/core/theme.service';

@Component({
  selector: 'app-theme-details-page',
  templateUrl: './theme-details-page.component.html',
  styleUrls: ['./theme-details-page.component.css']
})
export class ThemeDetailsPageComponent implements OnInit {

  theme!: ITheme<IPost, string>;

  refreshThemeRequest$ = new BehaviorSubject(undefined);

  isLoggedIn$: Observable<boolean> = this.authservice.isLoggedIn$;
  canSubscribe: boolean = false;
  currentUser?: IUser;
  isUserOwner: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private themeseService: ThemeService,
    private authservice: AuthService) { }

  ngOnInit(): void {
    //const themeId = this.activatedRoute.snapshot.params['themeId'];
    combineLatest([
      this.activatedRoute.params
        .pipe(
          mergeMap(params => {
            const themeId = params['themeId'];
            return this.refreshThemeRequest$
              .pipe(mergeMap(() => this.themeseService.loadThemeById$(themeId)))
          })
        ),
      this.authservice.currentUser$
    ])
      .subscribe(([theme, user]) => {
        this.currentUser = user;
        this.theme = theme;
        this.canSubscribe = user && !this.theme.subscribers.includes(user?._id);
        this.isUserOwner = user && theme.userId == user._id;
      });
  }
  
  canLike(comment: IPost): boolean {
    return this.currentUser && !comment.likes.includes(this.currentUser?._id) as any;
  }

  subscribe(): void {
    this.themeseService.subscribeToTheme$(this.theme._id)
      .subscribe(() => this.refreshThemeRequest$.next(undefined)
    )
  }

  unsubscribe(): void {
    this.themeseService.unsubscribe$(this.theme._id)
      .subscribe(() => this.refreshThemeRequest$.next(undefined)
    )
  }

  like(comment: IPost): void {
    this.themeseService.likePost$(comment._id)
      .subscribe(() => this.refreshThemeRequest$.next(undefined)
    )
  }

  unlike(comment: IPost): void {
    this.themeseService.dislikePost$(comment._id)
      .subscribe(() => this.refreshThemeRequest$.next(undefined)
    )
  }

}
