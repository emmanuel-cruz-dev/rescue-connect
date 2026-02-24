import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-my-profile',
  imports: [RouterModule, PRIMENG_IMPORTS],
  templateUrl: './my-profile.html',
})
export class MyProfile {
  private authService = inject(AuthService);
  currentUser = this.authService.currentUser;
}
