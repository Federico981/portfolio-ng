import { Component } from '@angular/core';
import {
  RegistrationService,
  User,
} from '../../service/registrationAndLogin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

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
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
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

  // fieldsCompleted: { [key in keyof Form]?: boolean } = {};
  privacyConsent: boolean = false;

  errorMessages: { [key: string]: string } = {}; // Per tenere traccia degli errori

  constructor(
    private router: Router,
    public serviceRegistration: RegistrationService
  ) {}

  // Funzione per gestire gli errori
  setError(field: string, message: string) {
    this.errorMessages[field] = message;
  }

  // Funzione generica per cambiare i valori del form
  changeField(field: keyof Form, value: string) {
    this.form[field] = value;
    // this.fieldsCompleted[field] = value.trim().length > 0;
  }

  get hasErrors(): boolean {
    return Object.keys(this.errorMessages).length > 0;
  }

  get emptyFields(): boolean {
    return (
      this.form.name === '' ||
      this.form.surname === '' ||
      this.form.email === '' ||
      this.form.confirmEmail === '' ||
      this.form.password === '' ||
      this.form.confirmPassword === ''
    );
  }

  private isValidEmail(email: string): boolean {
    // Regex base per email valida
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Modifica email
  changeEmail(newEmail: string) {
    this.changeField('email', newEmail);

    if (!this.isValidEmail(newEmail)) {
      this.setError('email', 'Formato email non valido');
    } else if (this.serviceRegistration.isEmailTaken(newEmail)) {
      this.setError('email', 'Email già in uso');
    } else {
      delete this.errorMessages['email'];
    }

    // Se la conferma email è già scritta, riconfronta anche quella
    if (this.form.confirmEmail && this.form.confirmEmail !== newEmail) {
      this.setError('confirmEmail', 'Le email non corrispondono');
    } else {
      delete this.errorMessages['confirmEmail'];
    }
  }

  // Controllo conferma email
  changeConfirmEmail(newConfirmEmail: string) {
    this.changeField('confirmEmail', newConfirmEmail);

    if (!this.isValidEmail(newConfirmEmail)) {
      this.setError('confirmEmail', 'Formato email non valido');
    } else if (this.form.email !== newConfirmEmail) {
      this.setError('confirmEmail', 'Le email non corrispondono');
    } else {
      delete this.errorMessages['confirmEmail'];
    }
  }

  // Controllo password
  changePassword(newPassword: string) {
    this.changeField('password', newPassword);
    if (
      this.form.confirmPassword &&
      this.form.password !== this.form.confirmPassword
    ) {
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
    if (!this.privacyConsent) {
      console.log('Devi accettare la privacy policy');
      return;
    }
    if (
      this.form.name !== '' &&
      this.form.surname !== '' &&
      this.form.email !== '' &&
      this.form.confirmEmail !== '' &&
      this.form.password !== '' &&
      this.form.confirmPassword !== '' &&
      Object.keys(this.errorMessages).length === 0
    ) {
      const newUser: User = {
        name: this.form.name,
        surname: this.form.surname,
        email: this.form.email,
        password: this.form.password,
      };

      // 1. Carico l’array esistente
      const existingUsers: User[] = JSON.parse(
        localStorage.getItem('user') || '[]'
      );

      // 2. Aggiungo il nuovo utente
      existingUsers.push(newUser);

      // 3. Aggiorno service e localStorage per la lista
      this.serviceRegistration.addUser(newUser);
      // (Se il service aggiorna già localStorage, non serve fare di nuovo setItem('user', …))
      localStorage.setItem('user', JSON.stringify(existingUsers));

      // 4. Salvo SOLO newUser come utente loggato
      localStorage.setItem('loggedUser', JSON.stringify(newUser));
      localStorage.setItem('isLoggedIn', 'true');

      this.router.navigate(['/home']);
      console.log('Utente registrato con successo!', newUser);
    }
    {
      console.log('Errore durante la registrazione:', this.errorMessages);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
