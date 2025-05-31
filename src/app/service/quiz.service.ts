import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string; // risposta corretta
}

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private questions: QuizQuestion[] = [
    {
      question: 'Quale comando serve a creare un nuovo componente in Angular?',
      options: ['ng new', 'ng g component', 'ng add', 'ng serve'],
      answer: 'ng g component',
    },
    {
      question: 'Qual è il decoratore per creare un servizio in Angular?',
      options: ['@NgModule', '@Injectable', '@Component', '@Service'],
      answer: '@Injectable',
    },
    {
      question: "Cos'è un BehaviorSubject?",
      options: [
        'Una direttiva',
        'Un operatore RxJS',
        "Un tipo di observable che mantiene l'ultimo valore",
        'Un modulo Angular',
      ],
      answer: "Un tipo di observable che mantiene l'ultimo valore",
    },
  ];

  private currentQuestionIndex = new BehaviorSubject<number>(0);
  private userAnswers = new BehaviorSubject<string[]>([]);

  questions$ = this.currentQuestionIndex.asObservable();
  answers$ = this.userAnswers.asObservable();

  constructor() {}

  getAllQuestions(): QuizQuestion[] {
    return this.questions;
  }

  getCurrentQuestion(): QuizQuestion | null {
    const index = this.currentQuestionIndex.value;
    return index < this.questions.length ? this.questions[index] : null;
  }

  submitAnswer(answer: string) {
    const currentIndex = this.currentQuestionIndex.value;

    // Blocca l'invio se il quiz è finito
    if (currentIndex >= this.questions.length) return;

    const updatedAnswers = [...this.userAnswers.value, answer];
    this.userAnswers.next(updatedAnswers);

    // Passa alla prossima domanda
    const nextIndex = currentIndex + 1;
    this.currentQuestionIndex.next(nextIndex);
  }

  resetQuiz() {
    this.currentQuestionIndex.next(0);
    this.userAnswers.next([]);
  }

  getCorrectAnswers(): string[] {
    return this.questions.map((q) => q.answer);
  }
}
