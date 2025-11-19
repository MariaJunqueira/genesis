import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CookieService } from '../shared/services/cookie/cookie.service';
import { PagesComponent } from './pages.component';
import { COOKIE_LANG } from '../shared/services/language/language.constant';

describe('PagesComponent', () => {
  let component: PagesComponent;
  let fixture: any;
  let translateService: TranslateService;
  let cookieServiceMock: any;

  beforeEach(async () => {
    cookieServiceMock = jasmine.createSpyObj('CookieService', ['setCookie']);

    await TestBed.configureTestingModule({
      imports: [PagesComponent, RouterModule.forRoot([]), TranslateModule.forRoot()],
      providers: [
        provideZonelessChangeDetection(),
        TranslateService,
        { provide: CookieService, useValue: cookieServiceMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    spyOn(translateService, 'use').and.callThrough();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


});
