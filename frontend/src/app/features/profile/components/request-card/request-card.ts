import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';
import { IAdoptionRequest } from '../../../../core/models';

@Component({
  selector: 'app-request-card',
  imports: [PRIMENG_IMPORTS],
  templateUrl: './request-card.html',
})
export class RequestCard {
  @Input({ required: true }) request!: IAdoptionRequest;
  @Output() onCancel = new EventEmitter<void>();

  constructor(private router: Router) {}

  get pet() {
    return this.request.petId;
  }

  viewPet(): void {
    this.router.navigate(['/pets', this.pet._id]);
  }
}
