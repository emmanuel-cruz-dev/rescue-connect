import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { PetsManagement } from './pages/pets-management/pets-management';
import { PetForm } from './pages/pet-form/pet-form';
import { UsersManagement } from './pages/users-management/users-management';
import { UserForm } from './pages/user-form/user-form';
import { AdoptionsManagement } from './pages/adoptions-management/adoptions-management';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: Dashboard,
    title: 'Dashboard - Admin',
  },
  {
    path: 'pets',
    component: PetsManagement,
    title: 'Gestión de Mascotas - Admin',
  },
  {
    path: 'pets/new',
    component: PetForm,
    title: 'Nueva Mascota - Admin',
  },
  {
    path: 'pets/:id/edit',
    component: PetForm,
    title: 'Editar Mascota - Admin',
  },
  {
    path: 'users',
    component: UsersManagement,
    title: 'Gestión de Usuarios - Admin',
  },
  {
    path: 'users/new',
    component: UserForm,
    title: 'Nuevo Usuario - Admin',
  },
  {
    path: 'users/:id/edit',
    component: UserForm,
    title: 'Editar Usuario - Admin',
  },
  {
    path: 'adoptions',
    component: AdoptionsManagement,
    title: 'Gestión de Adopciones - Admin',
  },
];
