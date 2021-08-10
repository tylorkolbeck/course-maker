import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  resError: string | null = null;
  formLoading: boolean = false;
  signupComplete: boolean = false;

  /** TODO
   * Validation:
   *  password is strong enough
   */

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.formBuilder.group(
      {
        email: new FormControl('tylor.kolbeck@gmail.com', [
          Validators.required,
          Validators.email,
        ]),

        password: new FormControl('12341234', [
          Validators.required,
          Validators.minLength(6),
        ]),
        password2: new FormControl('12341234', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      { validators: this.passwordsMatch }
    );
  }

  ngOnInit(): void {}

  passwordsMatch: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const pass1 = control.get('password');
    const pass2 = control.get('password2');

    return pass1?.value === pass2?.value ? null : { passDoNotMatch: true };
  };

  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get password2() {
    return this.signupForm.get('password2');
  }

  onRegisterUser() {
    this.formLoading = true;
    this.authService.signUp(this.signupForm.value).subscribe(
      (res) => {
        this.signupForm.reset();
        // this.router.navigate(['profile', 'login']);
        this.formLoading = false;
        this.signupComplete = true;
      },
      (error) => {
        this.resError = error;
        this.formLoading = false;
      }
    );
  }
}
