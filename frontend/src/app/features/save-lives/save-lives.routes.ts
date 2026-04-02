import { Routes } from '@angular/router';

import { SaveLives } from './pages/save-lives';

export const SAVE_LIVES_ROUTES: Routes = [
  {
    path: '',
    component: SaveLives,
    title: 'Salvá vidas',
  },
];
