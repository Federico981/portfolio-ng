import { Component } from '@angular/core';
import {
  Board,
  MessageBoardService,
} from '../../service/message-board.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sender-board',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './sender-board.component.html',
  styleUrl: './sender-board.component.scss',
})
export class SenderBoardComponent {
  constructor(
    public board: MessageBoardService,
    public userService: UsersService
  ) {}

  newBoard: { user: string; text: string; date: Date } = {
    user: this.userService.getUserName() || '',
    text: '',
    date: new Date(),
  }; //nuovo messaggio da mostrare nella bacheca
  currentBoaard: Board[] = []; //messaggio attuale nella bacheca

  ngOnInit() {
    // Imposto lo user una sola volta al caricamento
    this.newBoard.user = this.userService.getUserName();
    //Mi tiro giù ciò che la bacheca ha
    this.board.messagePosted.subscribe((board) => {
      this.currentBoaard = board;
    });
  }

  writeBoard() {
    this.board.postedMessage(this.newBoard);
  }
}
