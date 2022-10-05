import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
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
    private userService: UserService,
    private router: Router,
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

    this.userService.login$(this.loginFormGroup.value).subscribe({      
      next: (user) => {
        console.log(user);
        this.router.navigate(['/home'])
      },
      complete: () => {
        console.log('login stream completed');
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    });
  }
}
