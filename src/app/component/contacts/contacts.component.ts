import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { SocialContactsComponent } from '../social-contacts/social-contacts.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [FormComponent, SocialContactsComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {}
