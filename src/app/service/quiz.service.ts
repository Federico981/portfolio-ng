import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private questionsSubject = new BehaviorSubject<QuizQuestion[]>([]);
  public questions$ = this.questionsSubject.asObservable();

  private currentQuestionIndex = new BehaviorSubject<number>(0);
  currentQuestionIndex$ = this.currentQuestionIndex.asObservable();

  private userAnswers = new BehaviorSubject<string[]>([]);

  answers$ = this.userAnswers.asObservable();

  constructor(private translate: TranslateService) {
    this.loadQuestions();

    this.translate.onLangChange.subscribe(() => {
      this.loadQuestions();
      this.resetQuiz();
    });
  }

  private loadQuestions(): void {
    this.translate.get('QUIZ.QUESTIONS').subscribe((translated: any) => {
      const questions: QuizQuestion[] = Array.isArray(translated)
        ? translated
        : [];
      this.questionsSubject.next(questions);
    });
  }

  getCurrentQuestion(): QuizQuestion | null {
    const questions = this.questionsSubject.value;
    const index = this.currentQuestionIndex.value;
    return index < questions.length ? questions[index] : null;
  }

  submitAnswer(answer: string) {
    const currentIndex = this.currentQuestionIndex.value;
    const questions = this.questionsSubject.value;
    if (currentIndex >= questions.length) return;

    const updatedAnswers = [...this.userAnswers.value, answer];
    this.userAnswers.next(updatedAnswers);

    this.currentQuestionIndex.next(currentIndex + 1);
  }

  resetQuiz() {
    this.currentQuestionIndex.next(0);
    this.userAnswers.next([]);
  }

  getCorrectAnswers(): string[] {
    return this.questionsSubject.value.map((q) => q.answer);
  }
}
