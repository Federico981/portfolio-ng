import { Component } from '@angular/core';
import { Form, FormService } from '../../service/form.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  // styleUrl: './form.component.scss',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  form: {
    name: string;
    email: string;
    sentences: string;
  } = {
    name: '',
    email: '',
    sentences: '',
  };

  currentForm: Form[] = [];
  thankYouMessage = false;

  constructor(public formService: FormService) {}

  ngOnInit() {
    this.formService.formVar$.subscribe((form) => {
      this.currentForm = form;
    });
  }

  sendForm() {
    const templateParams = {
      from_name: this.form.name,
      reply_to: this.form.email,
      message: this.form.sentences,
    };

    fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'service_oatv59n',
        template_id: 'template_3mbyo5p',
        user_id: 'xOAa-p3gtgK00cQ9i',
        template_params: templateParams,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Email inviata!');
          this.formService.sendQuestions(this.form);
          this.thankYouMessage = true;
          this.form = { name: '', email: '', sentences: '' };
        } else {
          console.error('Errore nell’invio:', response.status);
        }
      })
      .catch((error) => {
        console.error('Errore nella richiesta:', error);
      });
  }
}
