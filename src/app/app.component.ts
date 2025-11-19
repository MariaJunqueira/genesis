import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './shared/services/language/language.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [LanguageService]
})
export class AppComponent {
  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.languageService.initLang();
  }
}
