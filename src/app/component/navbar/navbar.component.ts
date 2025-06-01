import { Component } from '@angular/core';
import { MENU_ITEMS } from '../../constants/menu-items';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  menuItems = MENU_ITEMS;

  constructor(private router: Router) {}

  logout() {
    console.log('logout');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
}
