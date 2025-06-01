import { Component } from '@angular/core';
import { RegistrationComponent } from './component/registration/registration.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { TranslateService } from '@ngx-translate/core';

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
  showNavbar = true;

  constructor(private router: Router, private translate: TranslateService) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const currentUrl = (event as NavigationEnd).urlAfterRedirects;
        this.showNavbar = !['/login', '/registration'].includes(currentUrl);
        window.scrollTo(0, 0);
      });
    // Lingue supportate
    translate.addLangs(['en', 'it']);
    translate.setDefaultLang('en');

    // Prova a usare la lingua del browser
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|it/) ? browserLang : 'en');
  }
}
