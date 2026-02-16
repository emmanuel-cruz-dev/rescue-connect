import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { EmptyLayout } from './layouts/empty-layout/empty-layout';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayout,
    canActivate: [guestGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
      },
    ],
  },
  {
    path: 'error',
    component: EmptyLayout,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/errors/error.routes').then((m) => m.ERRORS_ROUTES),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'error/not-found',
  },
];
