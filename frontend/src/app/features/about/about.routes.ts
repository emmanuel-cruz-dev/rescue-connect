import { Routes } from '@angular/router';

import { About } from './pages/about';

export const ABOUT_ROUTES: Routes = [
  {
    path: '',
    component: About,
    title: 'Sobre el proyecto',
  },
];
