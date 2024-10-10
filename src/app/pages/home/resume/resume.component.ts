import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [ButtonComponent, TranslateModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent {

}
