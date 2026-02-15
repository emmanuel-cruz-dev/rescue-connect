import { Routes } from '@angular/router';
import { Forbidden } from './pages/forbidden/forbidden';
import { NotFound } from './pages/not-found/not-found';
import { ServerError } from './pages/server-error/server-error';

export const ERRORS_ROUTES: Routes = [
  {
    path: 'forbidden',
    component: Forbidden,
  },
  {
    path: 'not-found',
    component: NotFound,
  },
  {
    path: 'server-error',
    component: ServerError,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
