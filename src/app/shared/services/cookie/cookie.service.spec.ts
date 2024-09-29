import { TestBed } from '@angular/core/testing';
import { CookieService } from './cookie.service';

describe('CookieService', () => {
  let service: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieService);

    // Clean up any existing cookies
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCookie', () => {
    it('should return null if cookie does not exist', () => {
      expect(service.getCookie('nonexistent')).toBeNull();
    });

    it('should return cookie value if cookie exists', () => {
      document.cookie = 'test=AngularTest';
      expect(service.getCookie('test')).toEqual('AngularTest');
    });
  });

  describe('setCookie', () => {
    it('should set a cookie', () => {
      service.setCookie('testSet', 'value', 1);
      expect(document.cookie).toContain('testSet=value');
    });

    it('should set a cookie with all parameters', () => {
      service.setCookie('fullCookie', 'fullValue', 1, '/', 'localhost', true, 'Strict');
      // Note: Direct validation of the cookie string via document.cookie is limited to the cookie's existence and potentially its value due to security restrictions in browsers.
      expect(document.cookie).toContain('fullCookie=fullValue');
    });
  });

  afterEach(() => {
    // Cleanup cookies
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    }
  });
});
