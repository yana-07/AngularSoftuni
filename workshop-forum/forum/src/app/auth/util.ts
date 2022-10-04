import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    // if (control.errors && Object.keys(control.errors)
    //         .filter(errName => errName !== 'email').length > 0) {
    //     return null;
    // }

    if (!value) {
        return null;
    }

    if (!/.{6,}@gmail\.(bg|com)/.test(value)) {
        return {
            email: true
        }
    }

    return null;
}

// ф-я, връщаща валидатор ф-я, на която валидатор ф-я при промяна в rePass контролката Angular ще подаде
// rePass контролката, тъй като ф-ята е регистрирана в rePass форм контролката
export function passwordMatch(passwordFormControl: AbstractControl): ValidatorFn {
    return function (rePasswordFormControl: AbstractControl): ValidationErrors | null {
        if (passwordFormControl.value !== rePasswordFormControl.value) {
            return {
                passwordMatch: true
            }
        }

        return null;
    }
}

// here we depend on some structure 
export function passwordMatch2(passwordFormControl: AbstractControl): ValidationErrors | null {
   const passwordGroup = passwordFormControl.parent as FormGroup;

   if (!passwordGroup) {
        return null;
   }

   const { password, rePassword } = passwordGroup.controls;
   if (password.value !== rePassword.value) {
        return {
            passwordMatch2: true
        }
   }

   return null;
}