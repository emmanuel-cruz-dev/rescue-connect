import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, PRIMENG_IMPORTS],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private authService = inject(AuthService);

  currentUser = this.authService.currentUser;

  stats = [
    { label: 'Mascotas Registradas', value: 0, icon: 'pi pi-heart', color: 'text-pink-500' },
    { label: 'Usuarios Activos', value: 0, icon: 'pi pi-users', color: 'text-blue-500' },
    { label: 'Adopciones Totales', value: 0, icon: 'pi pi-home', color: 'text-green-500' },
    { label: 'Solicitudes Pendientes', value: 0, icon: 'pi pi-clock', color: 'text-orange-500' },
  ];
}
