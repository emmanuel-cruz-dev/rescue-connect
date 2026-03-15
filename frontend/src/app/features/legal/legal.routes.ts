import { Routes } from '@angular/router';

import { Terms } from './pages/terms/terms';
import { Privacy } from './pages/privacy/privacy';

export const LEGAL_ROUTES: Routes = [
  {
    path: 'terms',
    component: Terms,
    title: 'Términos de uso',
  },
  {
    path: 'privacy',
    component: Privacy,
    title: 'Política de privacidad',
  },
];
