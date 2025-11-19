
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from '../shared/components/header/header.component';

@Component({
    selector: 'app-pages',
    imports: [RouterModule, HeaderComponent],
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss']
})
export class PagesComponent { }
