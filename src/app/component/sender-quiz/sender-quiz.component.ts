import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizQuestion, QuizService } from '../../service/quiz.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sender-quiz',
  standalone: true,
  imports: [CommonModule, TranslateModule], // Permette di usare *ngIf, *ngFor, etc.
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
    // Aspetta il caricamento delle domande
    this.quizService.questions$.subscribe((questions) => {
      this.allQuestions = questions;
    });

    // ⬇️ Iscriviti anche all’indice corrente
    this.quizService.currentQuestionIndex$.subscribe((index) => {
      if (index >= this.allQuestions.length && this.allQuestions.length > 0) {
        this.quizFinished = true;
        this.computeScore();
      } else {
        this.currentQuestion = this.quizService.getCurrentQuestion();
      }
    });

    this.quizService.answers$.subscribe((answers) => {
      this.userAnswers = answers;
    });
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
