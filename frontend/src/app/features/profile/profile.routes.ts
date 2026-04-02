import { Routes } from '@angular/router';

import { MyProfile } from './pages/my-profile/my-profile';
import { MyRequests } from './pages/my-requests/my-requests';
import { MyAdoptions } from './pages/my-adoptions/my-adoptions';
import { MyFavorites } from './pages/my-favorites/my-favorites';
import { ChangePassword } from './pages/change-password/change-password';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'me',
    pathMatch: 'full',
  },
  {
    path: 'me',
    component: MyProfile,
    title: 'Mi Perfil',
  },
  {
    path: 'my-requests',
    component: MyRequests,
    title: 'Mis Solicitudes',
  },
  {
    path: 'adoptions',
    component: MyAdoptions,
    title: 'Mis Adopciones',
  },
  {
    path: 'my-favorites',
    component: MyFavorites,
    title: 'Mis Favoritos',
  },
  {
    path: 'change-password',
    component: ChangePassword,
    title: 'Cambiar Contraseña',
  },
];
