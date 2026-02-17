import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SectionHeader } from '../section-header/section-header';
import { PetService } from '../../../pets/services/pet.service';
import { PetCard } from '../../../pets/components/pet-card/pet-card';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';
import { IPet } from '../../../../core/models/pet.model';

@Component({
  selector: 'app-featured-pets',
  imports: [RouterModule, PetCard, SectionHeader, PRIMENG_IMPORTS],
  templateUrl: './featured-pets.html',
})
export class FeaturedPets implements OnInit {
  private petService = inject(PetService);

  featuredPets = signal<IPet[]>([]);
  loading = signal<boolean>(false);
  responsiveOptions: any[] | undefined;

  ngOnInit(): void {
    this.petService.getAllPets({ adopted: false, limit: 8 }).subscribe({
      next: (response) => {
        if (Array.isArray(response.data)) {
          this.featuredPets.set(response.data);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error fetching featured pets:', error);
        this.loading.set(false);
      },
    });

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '1200px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '1024px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
