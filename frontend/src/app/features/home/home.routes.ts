import { Routes } from '@angular/router';

import { Landing } from './pages/landing';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: Landing,
    title: 'Inicio',
  },
];
