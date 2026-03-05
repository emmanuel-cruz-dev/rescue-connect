import { Routes } from '@angular/router';
import { Forbidden } from './pages/forbidden/forbidden';
import { NotFound } from './pages/not-found/not-found';
import { ServerError } from './pages/server-error/server-error';

export const ERRORS_ROUTES: Routes = [
  {
    path: 'forbidden',
    component: Forbidden,
    title: 'Acceso denegado',
  },
  {
    path: 'not-found',
    component: NotFound,
    title: 'Página no encontrada',
  },
  {
    path: 'server-error',
    component: ServerError,
    title: 'Error del servidor',
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
