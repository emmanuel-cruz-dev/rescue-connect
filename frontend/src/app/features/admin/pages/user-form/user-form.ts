import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-user-form',
  imports: [RouterModule, PRIMENG_IMPORTS],
  templateUrl: './user-form.html',
})
export class UserForm {
  private route = inject(ActivatedRoute);

  isEditMode = !!this.route.snapshot.paramMap.get('id');
  userId = this.route.snapshot.paramMap.get('id');
}
