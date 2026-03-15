import { Routes } from '@angular/router';

import { Terms } from './pages/terms/terms';

export const LEGAL_ROUTES: Routes = [
  {
    path: 'terms',
    component: Terms,
    title: 'Términos de uso',
  },
];
