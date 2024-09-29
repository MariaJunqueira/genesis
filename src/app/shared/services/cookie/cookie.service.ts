import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = this.getCookieString().split(';');
    for (const c of ca) {
      let cookie = c.trim();
      if (cookie.startsWith(nameEQ)) {
        return cookie.substring(nameEQ.length);
      }
    }
    return null;
  }

  setCookie(
    name: string,
    value: string,
    days?: number,
    path?: string,
    domain?: string,
    secure?: boolean,
    sameSite?: 'Lax' | 'Strict' | 'None'
  ): void {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    let cookieString = `${name}=${value}${expires}; path=${path ?? '/'}${domain ? '; domain=' + domain : ''}${
      secure ? '; secure' : ''
    }; SameSite=${sameSite ?? 'Lax'}`;
    this.setCookieString(cookieString);
  }

  private getCookieString(): string {
    return document.cookie;
  }

  private setCookieString(value: string): void {
    document.cookie = value;
  }
}
