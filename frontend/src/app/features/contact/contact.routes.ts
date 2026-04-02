import { Routes } from '@angular/router';

import { Contact } from './pages/contact';

export const CONTACT_ROUTES: Routes = [
  {
    path: '',
    component: Contact,
    title: 'Contacto',
  },
];
