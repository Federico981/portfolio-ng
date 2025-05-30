import { Component } from '@angular/core';
import { RegistrationComponent } from './component/registration/registration.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    NavbarComponent,
    FormsModule,
    CommonModule,
    RouterModule,
    RegistrationComponent,
    LoginComponent,
    FooterComponent,
  ],
})
export class AppComponent {
  // Vuoto per ora
}
