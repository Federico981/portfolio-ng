import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { ProjectComponent } from './component/project/project.component';
import { ContactsComponent } from './component/contacts/contacts.component';
import { PersonalPageComponent } from './component/personal-page/personal-page.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/registration', pathMatch: 'full' },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactsComponent, canActivate: [AuthGuard] },
  {
    path: 'personal-page',
    component: PersonalPageComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/login' },
];
