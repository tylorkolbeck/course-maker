import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/services/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string | null = null;
  formLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('tylor.kolbeck@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('12341234', [Validators.required]),
    });
  }

  onLogin() {
    this.formLoading = true;
    this.loginError = null;
    this.authService.signIn(this.email?.value, this.password?.value).subscribe(
      (res) => {
        if (res === 'success') {
          this.formLoading = false;
          this.router.navigateByUrl('/');
        }
      },
      (error: any) => {
        this.formLoading = false;
        this.loginError = error.message;
      }
    );
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {}
}
