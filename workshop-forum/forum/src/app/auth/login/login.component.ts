import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { UserService } from 'src/app/core/user.service';
import { emailValidator } from '../util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';

  loginFormGroup: FormGroup = this.formBuilder.group({
    'email': new FormControl('', [Validators.required, emailValidator]), //Validators.pattern 
    'password': new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  handleLogin(): void {
    // TODO: validate users's data
    // this.userService.login();
    // this.router.navigate(['/home']);

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
