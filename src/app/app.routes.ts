import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { ProjectComponent } from './component/project/project.component';
import { ContactsComponent } from './component/contacts/contacts.component';

export const routes: Routes = [
  { path: '', redirectTo: '/registration', pathMatch: 'full' },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'contact', component: ContactsComponent },
];
