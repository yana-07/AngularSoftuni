import { createAction, props } from "@ngrx/store";
import { IUser } from "src/app/core/interfaces";
import { IUpdateUserDto } from "src/app/core/user.service";

const profileDomain = '[ProfileComponent]'
export const profileLoaded =
    createAction(`${profileDomain} Profile Loaded`, props<{profile: IUser}>());
export const enterEditMode = createAction(`${profileDomain} Enter Edit Mode`);
export const exitEditMode = createAction(`${profileDomain} Exit Edit Mode`);
export const profilePageInitialized = createAction(`${profileDomain} Profile Initialize`)
export const profileLoadError = createAction(`${profileDomain} Profile Load Error`)
export const updateProfileStarted = createAction(`${profileDomain} Update Profile Triggered`, props<{ user: IUpdateUserDto }>());
export const updateProfileError = createAction(`${profileDomain} Update Profile Error`, props<{ errorMessage: string }>());
export const updateProfileCompleted = createAction(`${profileDomain} Update Profile Completed`, props<{ updatedUser: IUser }>());

export const loginDomain = '[LoginComponent]';
export const startLoginProcess = createAction(`${loginDomain} Start Login`);
export const endLoginProcess = createAction(`${loginDomain} End Login`);
export const loginProcessError = createAction(`${loginDomain} Login Error`, props<{errorMessage: string}>());
export const initializeLoginState = createAction(`${loginDomain} Login Initialize`);
