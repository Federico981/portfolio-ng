import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { UsersService } from '../../service/users.service';
import { TechnicalKnowledgeService } from '../../service/technical-knowledge.service';
import {
  MessageBoardService,
  Board,
} from '../../service/message-board.service';
import { SenderBoardComponent } from '../sender-board/sender-board.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SenderBoardComponent, FormsModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'], // ← correzione
})
export class HomepageComponent implements OnInit {
  username = '';
  technicalKnowledge: any[] = [];
  messages: Board[] = []; // array di tutti i messaggi nella board

  constructor(
    public userService: UsersService,
    public kt: TechnicalKnowledgeService,
    public boardService: MessageBoardService
  ) {}

  ngOnInit() {
    // Prendo nome e competenze
    this.username = this.userService.getUserName();
    this.technicalKnowledge = this.kt.getKnowledge();

    // Mi abbono ai messaggi: ogni volta che ne arriva uno,
    // Il service emette l'intero array aggiornato
    this.boardService.messagePosted.subscribe((board: Board[]) => {
      this.messages = board;
    });
  }
}
