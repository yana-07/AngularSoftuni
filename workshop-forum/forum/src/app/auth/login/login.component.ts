import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { MessageBusService, MessageType } from 'src/app/core/message-bus.service';
import { UserService } from 'src/app/core/user.service';
import { IAuthModuleState } from '../+store';
import { initializeLoginState, loginProcessError, startLoginProcess } from '../+store/actions';
import { loginErrorMessageSelector, loginIsLoginPendingSelector } from '../+store/selectors';
import { emailValidator } from '../util';

const myRequired = (control: AbstractControl): ValidationErrors | null => {
  console.log('validator called');
  return Validators.required(control);
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // they become global variables: keep in mind when reloading components -> reset state
  errorMessage$: Observable<string> = this.store.select(loginErrorMessageSelector);
  isLoginPending$: Observable<boolean> = this.store.select(loginIsLoginPendingSelector);

  loginFormGroup: FormGroup = this.formBuilder.group({
    'email': new FormControl('', {
       validators: [Validators.required, emailValidator], //Validators.pattern 
       //updateOn: 'submit'
      }), 
    'password': new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  constructor(
    private authService: AuthService,
    private messageBus: MessageBusService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<IAuthModuleState>) { }

  ngOnInit(): void {
    // this.loginFormGroup.get('email')?.valueChanges.subscribe(value =>{
    //   console.log(value)
    // });

    this.store.dispatch(initializeLoginState()); // can also be done on destroy
  }

  // loginHandler() {
  //   console.log('from click handler')
  // }

  handleLogin(): void {
    // TODO: validate users's data
    // this.userService.login();
    // this.router.navigate(['/home']);

    //console.log('from ngSubmit');

    this.store.dispatch(startLoginProcess());

    this.authService.login$(this.loginFormGroup.value).subscribe({      
      next: () => {
        if (!!this.activatedRoute.snapshot.queryParams['redirect-to']) {
          this.router.navigateByUrl(this.activatedRoute.snapshot.queryParams['redirect-to'])
        } else {
          this.router.navigate(['/home'])
        }  
        
        this.messageBus.notifyAboutMessage({
          text: 'User successfully logged in!',
          type: MessageType.Success
        });
      },
      complete: () => {
      },
      error: (err) => {
        this.store.dispatch(loginProcessError({errorMessage: err.error.message}));
      }
    });
  }
}
