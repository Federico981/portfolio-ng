import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';

export const routes: Routes = [
    { path: '', redirectTo: '/registration', pathMatch: 'full' },
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent }
];
