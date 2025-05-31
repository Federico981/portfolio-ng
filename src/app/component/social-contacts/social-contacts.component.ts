import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface Social {
  name: string;
  img: string;
  url: string;
}

@Component({
  selector: 'app-social-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-contacts.component.html',
  styleUrl: './social-contacts.component.scss',
})
export class SocialContactsComponent {
  phone: string = '33333333333';
  email: string = 'a@a.com';
  social: Social[] = [
    {
      name: 'LinkedIn',
      img: 'https://img.freepik.com/vettori-premium/vettore-del-logo-quadrato-di-linkedin_667864-115.jpg?semt=ais_hybrid&w=740',
      url: 'https://www.linkedin.com/in/tuo-profilo',
    },
    {
      name: 'GitHub',
      img: 'https://www.webfx.com/wp-content/uploads/2022/08/github-logo.png',
      url: 'https://github.com/tuo-username',
    },
  ];
}
