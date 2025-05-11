import { Component } from '@angular/core';
import { RegistrationComponent } from './component/registration/registration.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './component/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [FormsModule, CommonModule, RouterModule, RegistrationComponent, LoginComponent]
})
export class AppComponent {
  // Vuoto per ora
}