import { Injectable } from '@angular/core';

export interface User {
  name?: string;
  surname?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
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
    return this.users.some((user) => user.email === email);
  }

  //Controllo che la login sia valida
  validLogin(email: string, password: string): string {
    const users = JSON.parse(localStorage.getItem('user') || '[]');
    console.log('users', users);
    const userFound =
      users &&
      users.find(
        (user: any) => user.email === email && user.password === password
      );
    const emailExists =
      users && users.some((user: any) => user.email === email);
    const passwordExists =
      users && users.some((user: any) => user.password === password);

    console.log('userFound', userFound);

    const userFoundCredentials =
      users &&
      users.filter((e: any) => e.email === email && e.password === password);

    if (userFound) {
      localStorage.setItem('loggedUser', JSON.stringify(userFoundCredentials));
      return 'valid login';
    } else if (!emailExists) {
      return 'email not valid';
    } else if (!passwordExists) {
      return 'password not valid';
    } else {
      return 'email and password not valid';
    }
  }
}
