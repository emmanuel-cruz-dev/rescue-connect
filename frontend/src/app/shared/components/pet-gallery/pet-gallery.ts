import { Component, Input, OnChanges } from '@angular/core';
import { PRIMENG_IMPORTS } from '../../../shared/primeng/primeng.imports';

export interface GalleryImage {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
}

interface ResponsiveOptions {
  breakpoint: string;
  numVisible: number;
}

@Component({
  selector: 'app-pet-gallery',
  imports: [PRIMENG_IMPORTS],
  templateUrl: './pet-gallery.html',
})
export class PetGallery implements OnChanges {
  @Input() images: GalleryImage[] = [];
  @Input() fallbackImage: string = '/assets/images/pets/placeholder-dog.webp';
  @Input() showThumbnails: boolean = true;
  @Input() showNavigators: boolean = true;
  @Input() imageHeight: number = 400;

  galleryImages: GalleryImage[] = [];

  readonly responsiveOptions: ResponsiveOptions[] = [
    { breakpoint: '1280px', numVisible: 5 },
    { breakpoint: '1024px', numVisible: 4 },
    { breakpoint: '768px', numVisible: 4 },
    { breakpoint: '560px', numVisible: 4 },
  ];

  ngOnChanges(): void {
    this.galleryImages =
      this.images.length > 0
        ? this.images
        : [
            {
              itemImageSrc: this.fallbackImage,
              thumbnailImageSrc: this.fallbackImage,
              alt: 'Imagen no disponible',
            },
          ];
  }
}
