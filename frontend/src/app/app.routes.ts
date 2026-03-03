import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { ProfileLayout } from './layouts/profile-layout/profile-layout';
import { EmptyLayout } from './layouts/empty-layout/empty-layout';
import { authGuard, adminGuard, guestGuard } from './core/guards';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
      },
      {
        path: 'pets',
        loadChildren: () => import('./features/pets/pet.routes').then((m) => m.PETS_ROUTES),
      },
    ],
  },
  {
    path: 'profile',
    component: ProfileLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/profile/profile.routes').then((m) => m.PROFILE_ROUTES),
      },
    ],
  },
  {
    path: 'admin',
    component: DashboardLayout,
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
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
