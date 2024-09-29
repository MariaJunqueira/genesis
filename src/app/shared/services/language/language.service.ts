import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from '../cookie/cookie.service';
import { COOKIE_LANG, DEFAULT_LANG, SUPPORTED_LANGS } from './language.constant';

@Injectable()
export class LanguageService {
  constructor(private translate: TranslateService, private cookieService: CookieService) { }

  initLang() {
    this.translate.addLangs(SUPPORTED_LANGS);
    this.translate.setDefaultLang(DEFAULT_LANG);
    this.useCookieLang();
  }

  private useCookieLang() {
    const cookieLang = this.cookieService.getCookie(COOKIE_LANG);
    if (cookieLang) {
      this.translate.use(this.checkLang(cookieLang));
    } else {
      this.useBrowserLang();
    }
  }

  private useBrowserLang() {
    const browserLang = this.translate.getBrowserLang() || DEFAULT_LANG;
    const validatedLang = this.checkLang(browserLang);
    this.translate.use(validatedLang);
    this.setCookieLang(validatedLang);
  }

  private setCookieLang(lang: string) {
    this.cookieService.setCookie(COOKIE_LANG, lang, 360);
  }

  private checkLang(lang: string): string {
    return SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
  }
}
