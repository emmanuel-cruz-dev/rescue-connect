import { Routes } from '@angular/router';

import { authGuard, adminGuard, guestGuard } from './core/guards';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { ProfileLayout } from './layouts/profile-layout/profile-layout';
import { EmptyLayout } from './layouts/empty-layout/empty-layout';

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
      {
        path: 'how-it-works',
        loadChildren: () =>
          import('./features/how-it-works/how-it-works.routes').then((m) => m.HOW_IT_WORKS_ROUTES),
      },
      {
        path: 'requirements',
        loadChildren: () =>
          import('./features/requirements/requirements.routes').then((m) => m.REQUIREMENTS_ROUTES),
      },
      {
        path: 'about',
        loadChildren: () => import('./features/about/about.routes').then((m) => m.ABOUT_ROUTES),
      },
      {
        path: 'shelters',
        loadChildren: () =>
          import('./features/shelters/shelters.routes').then((m) => m.SHELTERS_ROUTES),
      },
      {
        path: 'save-lives',
        loadChildren: () =>
          import('./features/save-lives/save-lives.routes').then((m) => m.SAVE_LIVES_ROUTES),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./features/contact/contact.routes').then((m) => m.CONTACT_ROUTES),
      },
      {
        path: 'legal',
        loadChildren: () => import('./features/legal/legal.routes').then((m) => m.LEGAL_ROUTES),
      },
      {
        path: 'report',
        loadChildren: () => import('./features/report/report.routes').then((m) => m.REPORT_ROUTES),
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
