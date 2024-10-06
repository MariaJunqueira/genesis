import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { HeroComponent } from '../../shared/components/hero/hero.component';
import { ServicesComponent } from './services/services.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, ServicesComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
