import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  PawPrintIcon,
  CatIcon,
  DogIcon,
  HeartHandshakeIcon,
} from 'lucide-angular';
import { AdoptionFlowService } from '../../../adoptions/services/adoption-flow.service';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';
import { IPet } from '../../../../core/models';
import { PetType, PetSize } from '../../../../core/enums/pet-type.enum';

@Component({
  selector: 'app-pet-card',
  imports: [LucideAngularModule, PRIMENG_IMPORTS],
  templateUrl: './pet-card.html',
})
export class PetCard {
  @Input({ required: true }) pet!: IPet;

  private router = inject(Router);
  adoptionFlow = inject(AdoptionFlowService);

  readonly CatIcon = CatIcon;
  readonly DogIcon = DogIcon;
  readonly PawPrintIcon = PawPrintIcon;
  readonly HeartHandshakeIcon = HeartHandshakeIcon;

  get canAdopt() {
    return this.adoptionFlow.canAdopt(this.pet);
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

  getAgeLabel(): string {
    if (!this.pet.birthDate) return '';

    const birthDate = new Date(this.pet.birthDate);
    const today = new Date();

    const diffInMs = today.getTime() - birthDate.getTime();
    const totalMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30.44));

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years === 0) {
      return months === 1 ? '1 mes' : `${months} meses`;
    }

    if (months === 0) {
      return years === 1 ? '1 año' : `${years} años`;
    }

    const yearLabel = years === 1 ? 'año' : 'años';
    const monthLabel = months === 1 ? 'mes' : 'meses';

    return `${years} ${yearLabel} y ${months} ${monthLabel}`;
  }

  getSizeLabel(): string {
    const labels: Record<PetSize, string> = {
      pequeño: 'Pequeño',
      mediano: 'Mediano',
      grande: 'Grande',
      'extra grande': 'Extra grande',
    };
    return labels[this.pet.size];
  }

  viewDetails(): void {
    this.router.navigate(['/pets', this.pet._id]);
  }

  onAdopt() {
    this.adoptionFlow.openDialog(this.pet);
  }
}
