import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { CookieService } from '../../services/cookie/cookie.service';
import { COOKIE_LANG } from '../../services/language/language.constant';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public translate: TranslateService, private cookieService: CookieService) { }

  menuOpened = false;

  onLangChange(lang: string) {
    this.translate.use(lang);
    this.cookieService.setCookie(COOKIE_LANG, lang, 360);
  }

  toggleMenu() {
    this.menuOpened = !this.menuOpened;
  }
}
