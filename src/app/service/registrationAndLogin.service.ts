import { Injectable } from '@angular/core';

export interface User {
  name?: string;
  surname?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private users: User[] = [];

  errorLogin: string = '';

  getAllUsers(): User[] {
    return this.users;
  }


  //Per registrare un nuovo utente:
  addUser(user: User): void {
    this.users.push(user);
  }

  //Per controllare una mail già esistente
  isEmailTaken(email: string): boolean {
    return (this.users.some((user) => user.email === email))
  }

  //Controllo che la login sia valida
  validLogin(email: string, password: string): string {
    const user = this.users.find(u => u.email === email);
    if (!user) {
      return 'email not valid';
    }
    if (user.password !== password) {
      return 'password not valid';
    }
    return 'valid login';
  }

}
