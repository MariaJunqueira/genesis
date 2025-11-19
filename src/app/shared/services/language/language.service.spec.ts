import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { CookieService } from '../cookie/cookie.service';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;
  let translateService: TranslateService;
  let cookieServiceMock: any;

  beforeEach(() => {
    cookieServiceMock = jasmine.createSpyObj('CookieService', ['getCookie', 'setCookie']);

    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        provideZonelessChangeDetection(),
        LanguageService,
        TranslateService,
        { provide: CookieService, useValue: cookieServiceMock }
      ],
    });
    translateService = TestBed.inject(TranslateService); // Inject TranslateService first
    spyOn(translateService, 'use');
    spyOn(translateService, 'addLangs');
    spyOn(translateService, 'setDefaultLang');
    service = TestBed.inject(LanguageService); // Then inject service (which calls initLang in constructor)
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
    const mockLang = 'pt';
    cookieServiceMock.getCookie.and.returnValue(mockLang);
    service.initLang();
    expect(cookieServiceMock.getCookie).toHaveBeenCalled();
    expect(translateService.use).toHaveBeenCalledWith(mockLang);
  });

  it('should fallback to browser language if cookie not set', () => {
    const browserLang = 'pt';
    cookieServiceMock.getCookie.and.returnValue(null);
    spyOn(translateService, 'getBrowserLang').and.returnValue(browserLang);
    service.initLang();
    expect(cookieServiceMock.getCookie).toHaveBeenCalled();
    expect(translateService.getBrowserLang).toHaveBeenCalled();
    expect(translateService.use).toHaveBeenCalledWith(browserLang);
  });

  it('should use default language if browser language is not supported', () => {
    const unsupportedLang = 'es'; // Assuming 'es' is not in the SUPPORTED_LANGS
    cookieServiceMock.getCookie.and.returnValue(null);
    spyOn(translateService, 'getBrowserLang').and.returnValue(unsupportedLang);
    service.initLang();
    // Assuming 'en' is the DEFAULT_LANG and not including 'es' in SUPPORTED_LANGS
    expect(translateService.use).toHaveBeenCalledWith('en');
  });

  it('should set language cookie if using browser language', () => {
    const browserLang = 'en';
    cookieServiceMock.getCookie.and.returnValue(null);
    spyOn(translateService, 'getBrowserLang').and.returnValue(browserLang);
    service.initLang();
    expect(cookieServiceMock.setCookie).toHaveBeenCalledWith(jasmine.any(String), browserLang, 360);
  });
});
