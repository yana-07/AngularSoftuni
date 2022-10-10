import { createAction, props } from "@ngrx/store";
import { IUser } from "src/app/core/interfaces";

const profileDomain = '[ProfileComponent]'
export const profileLoaded =
    createAction(`${profileDomain} Profile Loaded`, props<{profile: IUser}>());
export const enterEditMode = createAction(`${profileDomain} Enter Edit Mode`);
export const exitEditMode = createAction(`${profileDomain} Exit Edit Mode`);
export const profilePageInitialized = createAction(`${profileDomain} Profile Initialize`)
export const profileLoadError = createAction(`${profileDomain} Profile Load Error`)

export const loginDomain = '[LoginComponent]';
export const startLoginProcess = createAction(`${loginDomain} Start Login`);
export const endLoginProcess = createAction(`${loginDomain} End Login`);
export const loginProcessError = createAction(`${loginDomain} Login Error`, props<{errorMessage: string}>());
export const initializeLoginState = createAction(`${loginDomain} Login Initialize`);
