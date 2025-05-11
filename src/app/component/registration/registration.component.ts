import { Component } from '@angular/core';
import { RegistrationService, User } from '../../service/registrationAndLogin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Form {
  name: string;
  surname: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  form: Form = {
    name: '',
    surname: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  };

  errorMessages: { [key: string]: string } = {}; // Per tenere traccia degli errori

  constructor(private router: Router, public serviceRegistration: RegistrationService) { }

  // Funzione per gestire gli errori
  setError(field: string, message: string) {
    this.errorMessages[field] = message;
  }

  // Funzione generica per cambiare i valori del form
  changeField(field: keyof Form, value: string) {
    this.form[field] = value;
  }

  get hasErrors(): boolean {
    return Object.keys(this.errorMessages).length > 0;
  }

  // Controllo email
  changeEmail(newEmail: string) {
    this.changeField('email', newEmail);
    if (this.serviceRegistration.isEmailTaken(newEmail)) {
      this.setError('email', 'Email già in uso');
    } else {
      delete this.errorMessages['email'];
    }
  }

  // Controllo conferma email
  changeConfirmEmail(newConfirmEmail: string) {
    this.changeField('confirmEmail', newConfirmEmail);
    if (this.form.email !== newConfirmEmail) {
      this.setError('confirmEmail', 'Le email non corrispondono');
    } else {
      delete this.errorMessages['confirmEmail'];
    }
  }

  // Controllo password
  changePassword(newPassword: string) {
    this.changeField('password', newPassword);
    if (this.form.confirmPassword && this.form.password !== this.form.confirmPassword) {
      this.setError('confirmPassword', 'Le password non corrispondono');
    } else {
      delete this.errorMessages['password'];
      delete this.errorMessages['confirmPassword'];
    }
  }

  // Controllo conferma password
  changeConfirmPassword(newConfirmPassword: string) {
    this.changeField('confirmPassword', newConfirmPassword);
    if (this.form.password !== newConfirmPassword) {
      this.setError('confirmPassword', 'Le password non corrispondono');
    } else {
      delete this.errorMessages['confirmPassword'];
    }
  }

  // Funzione per il submit del form
  submitForm() {
    // Controlla che non ci siano errori
    if (Object.keys(this.errorMessages).length === 0) {
      const newUser: User = {
        name: this.form.name,
        surname: this.form.surname,
        email: this.form.email,
        password: this.form.password
      };

      this.serviceRegistration.addUser(newUser);
      console.log('Utente registrato con successo!', newUser);
    } else {
      console.log('Errore durante la registrazione:', this.errorMessages);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}