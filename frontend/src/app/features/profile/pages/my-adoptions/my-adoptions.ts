import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services';
import { PetCard } from '../../../pets/components/pet-card/pet-card';
import { PetCardSkeleton } from '../../../../shared/components/pet-card-skeleton/pet-card-skeleton';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';
import { IPet } from '../../../../core/models';

@Component({
  selector: 'app-my-adoptions',
  imports: [RouterModule, PetCard, PetCardSkeleton, PRIMENG_IMPORTS],
  templateUrl: './my-adoptions.html',
})
export class MyAdoptions implements OnInit {
  private authService = inject(AuthService);

  pets = signal<IPet[]>([]);
  loading = signal<boolean>(false);

  ngOnInit(): void {
    this.loading.set(true);
    this.authService.getMyPets().subscribe({
      next: (response) => {
        if (Array.isArray(response?.data?.pets)) {
          this.pets.set(response?.data?.pets);
        }
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        throw new Error('Error al obtener las mascotas adoptadas');
      },
    });
  }
}
