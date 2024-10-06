import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { HeroComponent } from '../../shared/components/hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
