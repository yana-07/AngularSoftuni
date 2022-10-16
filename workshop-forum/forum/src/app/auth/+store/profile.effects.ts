import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType} from '@ngrx/effects'
import { catchError, filter, map, mergeMap, of } from "rxjs";
import { login } from "src/app/+store";
import { UserService } from "src/app/core/user.service";
import { profileLoaded, profileLoadError, profilePageInitialized, updateProfileCompleted, updateProfileError, updateProfileStarted } from "./actions";

@Injectable()
export class ProfileEffects {
    constructor(
        private actions$: Actions,
        private userService: UserService
    ) {}   
    
    onProfilePageLoaded = createEffect(() =>
        this.actions$.pipe(
            filter(a => a.type === profilePageInitialized().type),
            mergeMap(() => this.userService.getProfile$()),
            map(currentProfile => profileLoaded({ profile: currentProfile })),
            catchError((err) => of(profileLoadError()))
        )
    ) 
    
    onProfieUpdateStarted$ = createEffect(() => 
        this.actions$.pipe(
            ofType(updateProfileStarted),
            mergeMap(action => this.userService.updateProfile$(action.user)
                .pipe(
                    map(result => updateProfileCompleted({ updatedUser: result })),
                    catchError(err => of(updateProfileError({ errorMessage: err.error.message })))
                )
            )           
        )
    )

    onProfileUpdateCompleted$ = createEffect(() => 
        this.actions$.pipe(
            ofType(updateProfileCompleted),
            map(result => login({ user: result.updatedUser }))
        )
    )
}



