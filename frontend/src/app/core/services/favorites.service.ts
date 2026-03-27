import { Injectable, signal, inject } from '@angular/core';

import { AuthService } from './auth.service';
import { IPet } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private authService = inject(AuthService);
  public favorites = signal<IPet[]>([]);

  constructor() {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.loadFavorites(user._id);
      } else {
        this.favorites.set([]);
      }
    });
  }

  private loadFavorites(userId: string): void {
    const stored = localStorage.getItem(`favorites_${userId}`);
    if (stored) {
      try {
        this.favorites.set(JSON.parse(stored));
      } catch (e) {
        this.favorites.set([]);
      }
    } else {
      this.favorites.set([]);
    }
  }

  private saveFavorites(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      localStorage.setItem(`favorites_${user._id}`, JSON.stringify(this.favorites()));
    }
  }

  getFavorites(): IPet[] {
    return this.favorites();
  }

  isFavorite(petId: string): boolean {
    return this.favorites().some((p) => p._id === petId);
  }

  addFavorite(pet: IPet): void {
    if (!this.isFavorite(pet._id)) {
      this.favorites.update((favs) => [...favs, pet]);
      this.saveFavorites();
    }
  }

  removeFavorite(petId: string): void {
    this.favorites.update((favs) => favs.filter((p) => p._id !== petId));
    this.saveFavorites();
  }

  toggleFavorite(pet: IPet): void {
    if (this.isFavorite(pet._id)) {
      this.removeFavorite(pet._id);
    } else {
      this.addFavorite(pet);
    }
  }
}
