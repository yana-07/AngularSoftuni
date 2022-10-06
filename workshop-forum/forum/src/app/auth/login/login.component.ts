import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { MessageBusService, MessageType } from 'src/app/core/message-bus.service';
import { UserService } from 'src/app/core/user.service';
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
  errorMessage: string = '';

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
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.loginFormGroup.get('email')?.valueChanges.subscribe(value =>{
    //   console.log(value)
    // });
  }

  // loginHandler() {
  //   console.log('from click handler')
  // }

  handleLogin(): void {
    // TODO: validate users's data
    // this.userService.login();
    // this.router.navigate(['/home']);

    //console.log('from ngSubmit');

    this.errorMessage = '';

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
        this.errorMessage = err.error.message;
      }
    });
  }
}
