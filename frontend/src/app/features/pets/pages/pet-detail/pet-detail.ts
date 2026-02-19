import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule, PawPrintIcon } from 'lucide-angular';
import { PetService } from '../../services/pet.service';
import { PetGallery, GalleryImage } from '../../../../shared/components/pet-gallery/pet-gallery';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';
import { PetSize } from '../../../../core/enums/pet-type.enum';

@Component({
  selector: 'app-pet-detail',
  imports: [PRIMENG_IMPORTS, LucideAngularModule, PetGallery],
  templateUrl: './pet-detail.html',
})
export class PetDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private petService = inject(PetService);

  pet = this.petService.selectedPet;
  loading = this.petService.loading;

  readonly PawPrintIcon = PawPrintIcon;

  selectedImageIndex = signal<number>(0);

  selectedImage = computed(() => {
    const p = this.pet();
    if (!p || !p.images?.length) return this.getPlaceholderImage();
    return p.images[this.selectedImageIndex()]?.url ?? this.getPlaceholderImage();
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.petService.selectedPet.set(null);
      this.petService.getPetById(id).subscribe({
        error: () => this.router.navigate(['/pets']),
      });
    } else {
      this.router.navigate(['/pets']);
    }
  }

  getPlaceholderImage(): string {
    const type = this.pet()?.type;
    return type === 'gato'
      ? '/assets/images/pets/placeholder-cat.webp'
      : '/assets/images/pets/placeholder-dog.webp';
  }

  getAgeLabel(): string {
    const birthDate = this.pet()?.birthDate;
    if (!birthDate) return 'Edad desconocida';

    const birth = new Date(birthDate);
    const today = new Date();
    const totalMonths = Math.floor(
      (today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 30.44)
    );
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years === 0) return months === 1 ? '1 mes' : `${months} meses`;
    if (months === 0) return years === 1 ? '1 año' : `${years} años`;

    return `${years} ${years === 1 ? 'año' : 'años'} y ${months} ${months === 1 ? 'mes' : 'meses'}`;
  }

  getSizeLabel(): string {
    const labels: Record<PetSize, string> = {
      pequeño: 'Pequeño',
      mediano: 'Mediano',
      grande: 'Grande',
      'extra grande': 'Extra grande',
    };
    return labels[this.pet()?.size as PetSize] ?? '';
  }

  galleryImages = computed<GalleryImage[]>(() => {
    const p = this.pet();
    if (!p?.images?.length) return [];
    return p.images.map((img) => ({
      itemImageSrc: img.url,
      thumbnailImageSrc: img.url,
      alt: p.name,
    }));
  });

  goBack(): void {
    this.router.navigate(['/pets']);
  }
}
