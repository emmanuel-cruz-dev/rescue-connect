import { Routes } from '@angular/router';
import { PetList } from './pages/pet-list/pet-list';
import { PetDetail } from './pages/pet-detail/pet-detail';

export const PETS_ROUTES: Routes = [
  {
    path: '',
    component: PetList,
  },
  {
    path: ':id',
    component: PetDetail,
  },
];
