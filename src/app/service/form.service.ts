import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Form {
  name: string;
  email: string;
  sentences: string;
}

@Injectable({
  providedIn: 'root',
})
export class FormService {
  form = new BehaviorSubject<Form[]>([]);
  formVar$ = this.form.asObservable();

  getAllForms(): Form[] {
    return this.form.getValue();
  }

  sendQuestions(form: Form) {
    const updatedForm = [...this.form.value, form];
    this.form.next(updatedForm);
  }

  constructor() {}
}
