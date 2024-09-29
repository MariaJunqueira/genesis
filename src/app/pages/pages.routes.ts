import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
    ],
  },
];
