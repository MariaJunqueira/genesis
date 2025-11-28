
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from "../shared/components/footer/footer.component";

@Component({
    selector: 'app-pages',
    imports: [RouterModule, HeaderComponent, FooterComponent],
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss']
})
export class PagesComponent { }
