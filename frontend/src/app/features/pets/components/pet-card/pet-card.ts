import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import {
  LucideAngularModule,
  PawPrintIcon,
  CatIcon,
  DogIcon,
  HeartHandshakeIcon,
} from 'lucide-angular';

import { AdoptionFlowService } from '../../../adoptions/services/adoption-flow.service';
import { FavoritesService } from '../../../../core/services';
import {
  PetAgePipe,
  PetSizeLabelPipe,
  PetTypeLabelPipe,
  ImageFallbackDirective,
  ClickStopPropagationDirective,
  PRIMENG_IMPORTS,
} from '../../../../shared';
import { IPet } from '../../../../core/models';
import { PetType } from '../../../../core/enums/pet-type.enum';

@Component({
  selector: 'app-pet-card',
  imports: [
    NgOptimizedImage,
    LucideAngularModule,
    PetAgePipe,
    PetSizeLabelPipe,
    PetTypeLabelPipe,
    ImageFallbackDirective,
    ClickStopPropagationDirective,
    PRIMENG_IMPORTS,
  ],
  templateUrl: './pet-card.html',
})
export class PetCard {
  @Input({ required: true }) pet!: IPet;

  private router = inject(Router);
  adoptionFlow = inject(AdoptionFlowService);
  favoritesService = inject(FavoritesService);

  readonly CatIcon = CatIcon;
  readonly DogIcon = DogIcon;
  readonly PawPrintIcon = PawPrintIcon;
  readonly HeartHandshakeIcon = HeartHandshakeIcon;

  get canAdopt() {
    return this.adoptionFlow.canAdopt(this.pet);
  }

  get isFavorite() {
    return this.favoritesService.isFavorite(this.pet._id);
  }

  toggleFavorite(event: Event) {
    event.stopPropagation();
    this.favoritesService.toggleFavorite(this.pet);
  }

  get mainImage(): string {
    if (this.pet.images && this.pet.images.length > 0) {
      return this.pet.images[0].url;
    }
    return this.getPlaceholderImage();
  }

  getPlaceholderImage(): string {
    const placeholders: Record<PetType, string> = {
      perro: '/assets/images/pets/placeholder-dog.webp',
      gato: '/assets/images/pets/placeholder-cat.webp',
    };
    return placeholders[this.pet.type] ?? placeholders['perro'];
  }

  viewDetails(): void {
    this.router.navigate(['/pets', this.pet._id]);
  }

  onAdopt() {
    this.adoptionFlow.openDialog(this.pet);
  }

  getCloudinaryPath(url: string) {
    return url.split('/upload/')[1];
  }
}
