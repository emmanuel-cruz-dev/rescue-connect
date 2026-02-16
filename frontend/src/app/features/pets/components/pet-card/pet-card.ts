import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  PawPrintIcon,
  CatIcon,
  DogIcon,
  HeartHandshakeIcon,
} from 'lucide-angular';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';
import { IPet } from '../../../../core/models/pet.model';
import { PetType } from '../../../../core/enums/pet-type.enum';

@Component({
  selector: 'app-pet-card',
  imports: [PRIMENG_IMPORTS, LucideAngularModule],
  templateUrl: './pet-card.html',
})
export class PetCard {
  @Input({ required: true }) pet!: IPet;
  @Input() showAdoptButton = true;
  @Input() showAdminActions = false;

  @Output() adopt = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  private router = inject(Router);

  readonly CatIcon = CatIcon;
  readonly DogIcon = DogIcon;
  readonly PawPrintIcon = PawPrintIcon;
  readonly HeartHandshakeIcon = HeartHandshakeIcon;

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

  viewDetails(): void {
    this.router.navigate(['/pets', this.pet._id]);
  }

  onAdopt(): void {
    this.adopt.emit(this.pet._id);
  }

  onEdit(): void {
    this.edit.emit(this.pet._id);
  }

  onDelete(): void {
    this.delete.emit(this.pet._id);
  }
}
