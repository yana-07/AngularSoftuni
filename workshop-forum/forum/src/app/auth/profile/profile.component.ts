import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, pipe, tap } from 'rxjs';
import { IUser } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/user.service';
import { IAuthModuleState } from '../+store';
import { enterEditMode, exitEditMode, profileLoaded, profilePageInitialized } from '../+store/actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('editProfileForm') editProfileForm!: NgForm;

  //currentUser!: IUser; //= this.userService.currentUser;
  currentUser$: Observable<IUser> = this.store.select(state => state.auth.profile.currentProfile);
  //  .pipe(tap(user => this.currentUser = user));

  isInEditMode$: Observable<boolean> = this.store.select(state => state.auth.profile.isInEditMode);

  hasErrorOccurred$: Observable<boolean> = this.store.select(state => state.auth.profile.errorOccurred);

  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<IAuthModuleState>) { }

  ngOnInit(): void {
    this.store.dispatch(profilePageInitialized());
    this.hasErrorOccurred$.subscribe((hasError) => {
      if (hasError) {
        this.router.navigate(['/user/login']);
      }
    });
    // this.userService.getProfile$().subscribe({
    //   next: (user) => {
    //     this.store.dispatch(profileLoaded({ profile: user }));
    //     //this.currentUser = user;
    //   },
    //   error: (err) => {
    //     this.router.navigate(['/login']);
    //   }
    // });
  }

  enterEditMode(currentUser: IUser): void {
    // клик enterEditMode тригерира change detection, тригерира се и следният event handler, който сменя стойността на
    // isInEditMode, която промяна ще ъпдейтне темлейта, НО промяната ще се приложи чак след като change detection-ът 
    // бъде пропагейтнат до руута, т.е. условно след като излезем извън функцията. Затова без setTimeout няма как да
    // достъпим editProfileForm, тъй като тя все още не е инициализирана (темплейтът не е ъпдейтнат), това ще се случи
    // едва след приключване на метода; click event-ът bubble-ва нагоре по DOM дървото, а change tracker проследява
    // дали евентуално не се е случила промяна и по други компоненти нагоре
    // Т.е. благодарение на setTimeout извикваме patchValue едва след като промяната в темплейта е отразена и 
    // editProfileForm е инициализирана
    // Ако ползвахме реактивни форми, то тогава без проблем директно бихме могили да мутираме обекта, но ползвайки
    // темплейтни форми се зависими от това, кога се случват промени в темплейта

    //this.isInEditMode = true;
    this.store.dispatch(enterEditMode())

    setTimeout(() => {
      this.editProfileForm.form.patchValue({
        username: currentUser.username,
        email: currentUser.email,
        'select-tel': !!currentUser.tel && currentUser.tel.length > 4 
          ? currentUser.tel.substring(0, 4) : '',
        tel: !!currentUser.tel && currentUser.tel.length > 4 
          ? currentUser.tel.substring(4) : currentUser.tel
      })
    });
  }

  upateProfile(): void {
    console.log(this.editProfileForm.value);
    // TODO: continue with http request to api
    //this.isInEditMode = false;
    this.exitEditMode();
  }

  exitEditMode(): void {
    this.store.dispatch(exitEditMode());
  }

}
