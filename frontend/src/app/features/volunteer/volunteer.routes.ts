import { Routes } from '@angular/router';

import { Volunteer } from './pages/volunteer/volunteer';

export const VOLUNTEER_ROUTES: Routes = [
  {
    path: '',
    component: Volunteer,
    title: 'Sumarse como voluntario',
  },
];
