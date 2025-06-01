import { Component } from '@angular/core';
import { RegistrationService } from '../../service/registrationAndLogin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

interface Form {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, FormsModule, CommonModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userLogged = JSON.parse(localStorage.getItem('user')!);

  formLogin: Form = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    public loginService: RegistrationService
  ) {}

  errorMessages: { [key: string]: string } = {};

  hidePassword: boolean = false;

  onInit() {}

  //Errori vari
  setError(field: string, message: string) {
    this.errorMessages[field] = message;
  }

  clearErrors() {
    this.errorMessages = {};
  }

  changeField(field: keyof Form, value: string) {
    this.formLogin[field] = value;
  }

  get hasErrors(): boolean {
    return Object.keys(this.errorMessages).length > 0;
  }

  goToRegister() {
    this.router.navigate(['/registration']);
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    this.clearErrors();

    console.log('EMAIL:', this.userLogged.email);
    console.log('PASSWORD:', this.userLogged.password);
    const result = this.loginService.validLogin(
      this.formLogin.email,
      this.formLogin.password
    );
    switch (result) {
      case 'email not valid':
        this.setError('email', 'email not valid');
        break;
      case 'password not valid':
        this.setError('password', 'password not valid');
        break;
      case 'valid login':
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/home']);
        console.log('login valida');
        break;
    }
    console.log('result', result);
  }
}
