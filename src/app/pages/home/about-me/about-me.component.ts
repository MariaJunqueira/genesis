import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
    selector: 'app-about-me',
    imports: [ButtonComponent, RouterLink, TranslateModule],
    templateUrl: './about-me.component.html',
    styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {

}
