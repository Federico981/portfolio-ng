import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  name: string;
  surname?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  /** Ritorna l’oggetto User salvato in localStorage, oppure null */
  getUser(): User | null {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw)[0] ?? null : null;
  }

  /** Ritorna solo il nome, o stringa vuota se non c’è utente */
  // getUserName(): string {
  //   const userLogged = JSON.parse(localStorage.getItem('loggedUser')!);
  //   return userLogged ? userLogged[0].name : '';
  // }

  getUserName(): string {
    try {
      const raw = localStorage.getItem('loggedUser');
      if (!raw) return '';
      const users: any = JSON.parse(raw);
      console.log('users', users, users.name);
      // return users[0]?.name ?? '';
      return users && users.name
        ? users.name
        : users && users[0] && users[0].name
        ? users[0].name
        : '';
    } catch (e) {
      console.error('Errore nel parsing del loggedUser:', e);
      return '';
    }
  }
}
