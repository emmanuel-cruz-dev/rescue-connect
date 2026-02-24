import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-pet-form',
  imports: [RouterModule, PRIMENG_IMPORTS],
  templateUrl: './pet-form.html',
})
export class PetForm {
  private route = inject(ActivatedRoute);

  isEditMode = !!this.route.snapshot.paramMap.get('id');
  petId = this.route.snapshot.paramMap.get('id');
}
