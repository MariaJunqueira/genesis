import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { CookieService } from '../cookie/cookie.service';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;
  let translateService: jasmine.SpyObj<TranslateService>;
  let cookieService: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    translateService = jasmine.createSpyObj('TranslateService', [
      'addLangs',
      'setDefaultLang',
      'use',
      'getBrowserLang',
    ]);
    cookieService = jasmine.createSpyObj('CookieService', ['getCookie', 'setCookie']);

    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        { provide: TranslateService, useValue: translateService },
        { provide: CookieService, useValue: cookieService },
      ],
    });
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default language', () => {
    service.initLang();
    expect(translateService.addLangs).toHaveBeenCalledWith(jasmine.any(Array));
    expect(translateService.setDefaultLang).toHaveBeenCalledWith(jasmine.any(String));
  });

  it('should use language from cookie if available', () => {
    const mockLang = 'de';
    cookieService.getCookie.and.returnValue(mockLang);
    service.initLang();
    expect(cookieService.getCookie).toHaveBeenCalled();
    expect(translateService.use).toHaveBeenCalledWith(mockLang);
  });

  it('should fallback to browser language if cookie not set', () => {
    const browserLang = 'fr';
    cookieService.getCookie.and.returnValue(null);
    translateService.getBrowserLang.and.returnValue(browserLang);
    service.initLang();
    expect(cookieService.getCookie).toHaveBeenCalled();
    expect(translateService.getBrowserLang).toHaveBeenCalled();
    expect(translateService.use).toHaveBeenCalledWith(browserLang);
  });

  it('should use default language if browser language is not supported', () => {
    const unsupportedLang = 'es'; // Assuming 'es' is not in the SUPPORTED_LANGS
    cookieService.getCookie.and.returnValue(null);
    translateService.getBrowserLang.and.returnValue(unsupportedLang);
    service.initLang();
    // Assuming 'en' is the DEFAULT_LANG and not including 'es' in SUPPORTED_LANGS
    expect(translateService.use).toHaveBeenCalledWith('en');
  });

  it('should set language cookie if using browser language', () => {
    const browserLang = 'en';
    cookieService.getCookie.and.returnValue(null);
    translateService.getBrowserLang.and.returnValue(browserLang);
    service.initLang();
    expect(cookieService.setCookie).toHaveBeenCalledWith(jasmine.any(String), browserLang, 360);
  });
});
