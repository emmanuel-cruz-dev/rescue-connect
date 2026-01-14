import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PetService } from '../../../pets/services/pet.service';
import { PetCard } from '../../../pets/components/pet-card/pet-card';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-featured-pets',
  imports: [RouterModule, PetCard, PRIMENG_IMPORTS],
  templateUrl: './featured-pets.html',
})
export class FeaturedPets implements OnInit {
  private petService = inject(PetService);

  featuredPets = this.petService.pets$;
  loading = this.petService.loading;
  responsiveOptions: any[] | undefined;

  ngOnInit(): void {
    this.petService.getAvailablePets().subscribe();

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
