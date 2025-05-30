import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Board {
  user: string;
  text: string;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class MessageBoardService {
  private messageBoard = new BehaviorSubject<Board[]>(this.loadMessages());
  messagePosted = this.messageBoard.asObservable();

  constructor() {}

  // Aggiungo un nuovo messaggio alla bacheca
  postedMessage(newMessage: Board) {
    const currentMessages = this.messageBoard.getValue();
    const updatedMessages = [...currentMessages, newMessage];
    this.messageBoard.next(updatedMessages);
    this.saveMessages(updatedMessages);
  }

  // Salvo i messaggi nel localStorage
  private saveMessages(messages: Board[]) {
    localStorage.setItem('messageBoard', JSON.stringify(messages));
  }

  // Carico i messaggi dal localStorage
  private loadMessages(): Board[] {
    const messages = localStorage.getItem('messageBoard');
    return messages ? JSON.parse(messages) : [];
  }
}
