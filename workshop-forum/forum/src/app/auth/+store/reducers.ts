import { createReducer, on } from "@ngrx/store";
import { ILoginPageState, IProfilePageState } from ".";
import { enterEditMode, exitEditMode, initializeLoginState, loginProcessError, profileLoaded, profileLoadError, startLoginProcess, updateProfileCompleted, updateProfileError } from "./actions";

export const profileReducer = createReducer<IProfilePageState>(
    {
        currentProfile: undefined as any,
        isInEditMode: false,
        errorOccurred: false
    },
    on(profileLoaded, (state, action) => {
        return {
            ...state,
            currentProfile: action.profile
        }
    }),
    on(enterEditMode, (state) => {
        return {
            ...state,
            isInEditMode: true
        }
    }),
    on(exitEditMode, (state) => {
        return {
            ...state,
            isInEditMode: false
        }
    }),
    on(profileLoadError, (state) => {
        return {
            ...state,
            errorOccurred: true
        }
    }),
    on(updateProfileCompleted, (state, action) => {
        return {
            ...state,
            currentProfile: action.updatedUser,
            isInEditMode: false
        }
    }),
    on(updateProfileError, (state, action) => {
        return {
            ...state,
            errorMessage: action.errorMessage
        }
    })
);

const loginInitialState = {
    errorMessage: '',
    isLoginPending: false
}

export const loginReducer = createReducer<ILoginPageState>(
    loginInitialState,
    on(startLoginProcess, (state) => {
        return {
            ...state,
            isLoginPending: true,
            errorMessage: ''
        }
    }),
    on(loginProcessError, (state, action) => {
        return {
            ...state,
            isLoginPending: false,
            errorMessage: action.errorMessage       
        }
    }),
    on(initializeLoginState, (state) => {
        return {
            ...state,
            ...loginInitialState
        }
    })
);