import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FavoritesService } from '../../../../core/services';
import { PetCard } from '../../../pets/components/pet-card/pet-card';
import { PRIMENG_IMPORTS } from '../../../../shared';

@Component({
  selector: 'app-my-favorites',
  imports: [PetCard, RouterModule, PRIMENG_IMPORTS],
  templateUrl: './my-favorites.html',
})
export class MyFavorites {
  favoritesService = inject(FavoritesService);

  get favorites() {
    return this.favoritesService.favorites();
  }
}
