import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizQuestion, QuizService } from '../../service/quiz.service';

@Component({
  selector: 'app-sender-quiz',
  standalone: true,
  imports: [CommonModule], // Permette di usare *ngIf, *ngFor, etc.
  templateUrl: './sender-quiz.component.html',
  styleUrls: ['./sender-quiz.component.scss'],
})
export class SenderQuizComponent implements OnInit {
  currentQuestion: QuizQuestion | null = null;
  allQuestions: QuizQuestion[] = [];
  userAnswers: string[] = [];
  quizFinished = false;
  score = 0;

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    // Carichiamo l'array completo di domande (opzionale, per mostrare numero di domande)
    this.allQuestions = this.quizService.getAllQuestions();

    // Sottoscriviamoci all’indice corrente
    this.quizService.questions$.subscribe((index: number) => {
      // Se l’indice è oltre la lunghezza dell’array, significa che il quiz è terminato
      if (index >= this.allQuestions.length) {
        this.quizFinished = true;
        this.computeScore();
      } else {
        this.currentQuestion = this.quizService.getCurrentQuestion();
      }
    });

    // Sottoscriviamoci alle risposte date dall’utente (opzionale, per mostrare in tempo reale)
    this.quizService.answers$.subscribe((answers: string[]) => {
      this.userAnswers = answers;
    });

    // Carichiamo subito la prima domanda
    this.currentQuestion = this.quizService.getCurrentQuestion();
  }

  /** Chiamato quando l'utente sceglie una delle opzioni */
  answer(option: string) {
    if (!this.quizFinished) {
      this.quizService.submitAnswer(option);
    }
  }

  /** Calcola il punteggio finale confrontando userAnswers e risposte corrette */
  computeScore() {
    const correctAnswers = this.quizService.getCorrectAnswers();
    this.score = this.userAnswers.reduce((sum, userAns, idx) => {
      return sum + (userAns === correctAnswers[idx] ? 1 : 0);
    }, 0);
  }

  /** Permette di ripetere il quiz */
  restartQuiz() {
    this.quizService.resetQuiz();
    this.quizFinished = false;
    this.score = 0;
  }
}
