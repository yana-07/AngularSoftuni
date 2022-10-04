import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUserdto, UserService } from 'src/app/core/user.service';
import { emailValidator, passwordMatch, passwordMatch2 } from '../util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  registerFormGroup = this.formBuilder.group({
    'username': new FormControl(null, [Validators.required, Validators.minLength(5)]),
    'email': new FormControl(null, [Validators.required, emailValidator]), //Validators.pattern(/.{6,}@gmail\.(bg|com)/)]), + pattern property in the errors object
    'passwords': new FormGroup({
      'password': this.passwordControl,
      'rePassword': new FormControl(null, [passwordMatch(this.passwordControl)]) // or [passwordMatch2]
    }),
    'tel': new FormControl(''),
    'telRegion': new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
     private userService: UserService,
     private router: Router) { }

  ngOnInit(): void {
  }

  shouldShowErrorForControl(controlName: string, sourceGroup: FormGroup = this.registerFormGroup): boolean {
    return sourceGroup.controls[controlName].touched && 
      sourceGroup.controls[controlName].invalid;
  }

  handleRegister(): void {
    const { username, email, passwords, tel, telRegion } = this.registerFormGroup.value;

    const body: CreateUserdto = {             //{ [key: string]: any } = { // like a map interface
      username: username!,
      email: email!,
      password: passwords?.password!,
      //...(!!tel && {tel: tel + telRegion})
    }

    if (tel) {
      body['tel'] = telRegion + tel;
    }

    this.userService.register$(body).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}
