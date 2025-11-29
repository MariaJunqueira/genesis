import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SocialLinksComponent } from '../social-links/social-links.component';

@Component({
    selector: 'app-footer',
    imports: [TranslateModule, SocialLinksComponent],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
    currentYear = new Date().getFullYear();
}
