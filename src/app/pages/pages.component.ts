import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GridDebugComponent } from '../shared/components/grid-debug/grid-debug.component';
import { HeaderComponent } from '../shared/components/header/header.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, GridDebugComponent],
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent { }
