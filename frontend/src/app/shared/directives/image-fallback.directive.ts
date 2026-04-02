import { Directive, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
  selector: 'img[appImageFallback]',
})
export class ImageFallbackDirective {
  @Input('appImageFallback') fallback = '/assets/images/pets/placeholder-dog.webp';

  constructor(private el: ElementRef<HTMLImageElement>) {}

  @HostListener('error')
  onError(): void {
    const img = this.el.nativeElement;
    if (img.src !== this.fallback) {
      img.src = this.fallback;
    }
  }
}
