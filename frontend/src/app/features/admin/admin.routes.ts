import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { PetsManagement } from './pages/pets-management/pets-management';
import { PetForm } from './pages/pet-form/pet-form';
import { UsersManagement } from './pages/users-management/users-management';
import { UserForm } from './pages/user-form/user-form';
import { AdoptionsManagement } from './pages/adoptions-management/adoptions-management';
import { MyProfile } from '../profile/pages/my-profile/my-profile';
import { ChangePassword } from '../profile/pages/change-password/change-password';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: Dashboard,
    title: 'Dashboard',
  },
  {
    path: 'pets',
    component: PetsManagement,
    title: 'Gestión de Mascotas',
  },
  {
    path: 'pets/new',
    component: PetForm,
    title: 'Nueva Mascota',
  },
  {
    path: 'pets/:id/edit',
    component: PetForm,
    title: 'Editar Mascota',
  },
  {
    path: 'users',
    component: UsersManagement,
    title: 'Gestión de Usuarios',
  },
  {
    path: 'users/new',
    component: UserForm,
    title: 'Nuevo Usuario',
  },
  {
    path: 'users/:id/edit',
    component: UserForm,
    title: 'Editar Usuario',
  },
  {
    path: 'adoptions',
    component: AdoptionsManagement,
    title: 'Gestión de Adopciones',
  },
  {
    path: 'me',
    component: MyProfile,
    title: 'Mi Perfil',
  },
  {
    path: 'change-password',
    component: ChangePassword,
    title: 'Cambiar Contraseña',
  },
];
