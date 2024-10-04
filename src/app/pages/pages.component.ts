import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from '../components/header/header.component';
import { GridDebugComponent } from '../shared/components/grid-debug/grid-debug.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, GridDebugComponent],
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent { }
