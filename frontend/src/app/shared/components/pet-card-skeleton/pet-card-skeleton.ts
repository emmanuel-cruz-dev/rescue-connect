import { Component, Input } from '@angular/core';
import { PRIMENG_IMPORTS } from '../../primeng/primeng.imports';

@Component({
  selector: 'app-pet-card-skeleton',
  imports: [PRIMENG_IMPORTS],
  templateUrl: './pet-card-skeleton.html',
  host: { class: 'contents' },
})
export class PetCardSkeleton {
  @Input() count = 6;
  skeletons = Array(this.count).fill(0);

  ngOnChanges(): void {
    this.skeletons = Array(this.count).fill(0);
  }
}
