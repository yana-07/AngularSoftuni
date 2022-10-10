import { Injectable } from "@angular/core";
import { Actions, createEffect} from '@ngrx/effects'
import { catchError, filter, map, mergeMap, of } from "rxjs";
import { UserService } from "src/app/core/user.service";
import { profileLoaded, profileLoadError, profilePageInitialized } from "./actions";

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
}



