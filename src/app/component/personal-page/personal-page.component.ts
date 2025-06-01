import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-personal-page',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './personal-page.component.html',
  styleUrl: './personal-page.component.scss',
})
export class PersonalPageComponent {
  name: string = 'Federico';
}
