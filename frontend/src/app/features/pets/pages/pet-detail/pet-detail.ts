import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LucideAngularModule, PawPrintIcon } from 'lucide-angular';

import { AuthService, FavoritesService } from '../../../../core/services';
import { PetService } from '../../services/pet.service';
import { AdoptionFlowService } from '../../../adoptions/services/adoption-flow.service';
import {
  PetGallery,
  GalleryImage,
  PetAgePipe,
  PetSizeLabelPipe,
  PetTypeLabelPipe,
  PRIMENG_IMPORTS,
} from '../../../../shared';

@Component({
  selector: 'app-pet-detail',
  imports: [
    RouterModule,
    LucideAngularModule,
    PetGallery,
    PetAgePipe,
    PetSizeLabelPipe,
    PetTypeLabelPipe,
    PRIMENG_IMPORTS,
  ],
  templateUrl: './pet-detail.html',
})
export class PetDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private petService = inject(PetService);
  private authService = inject(AuthService);
  private favoritesService = inject(FavoritesService);
  adoptionFlow = inject(AdoptionFlowService);

  pet = this.petService.selectedPet;
  loading = this.petService.loading;

  readonly PawPrintIcon = PawPrintIcon;

  selectedImageIndex = signal<number>(0);

  selectedImage = computed(() => {
    const p = this.pet();
    if (!p || !p.images?.length) return this.getPlaceholderImage();
    return p.images[this.selectedImageIndex()]?.url ?? this.getPlaceholderImage();
  });

  get canAdopt() {
    return this.adoptionFlow.canAdopt(this.pet()!);
  }

  get isLoggedIn(): boolean {
    return !!this.authService.getCurrentUser();
  }

  get isFavorite() {
    return this.favoritesService.isFavorite(this.pet()!._id);
  }

  toggleFavorite(event: Event) {
    event.stopPropagation();
    this.favoritesService.toggleFavorite(this.pet()!);
  }

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

  galleryImages = computed<GalleryImage[]>(() => {
    const p = this.pet();
    if (!p?.images?.length) return [];
    return p.images.map((img) => ({
      itemImageSrc: img.url,
      thumbnailImageSrc: img.url,
      alt: p.name,
    }));
  });

  onAdopt() {
    this.adoptionFlow.openDialog(this.pet()!);
  }

  goBack(): void {
    this.router.navigate(['/pets']);
  }
}
