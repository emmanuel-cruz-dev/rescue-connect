import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AdminService } from '../../services/admin.service';
import { PetService } from '../../../pets/services/pet.service';
import { AdoptionService } from '../../../adoptions/services/adoption.service';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, PRIMENG_IMPORTS],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private authService = inject(AuthService);
  private adminService = inject(AdminService);
  private petService = inject(PetService);
  private adoptionService = inject(AdoptionService);

  currentUser = this.authService.currentUser;

  totalUsers = signal(0);
  totalPets = signal(0);
  totalAdopted = signal(0);
  totalPending = signal(0);

  get stats() {
    return [
      {
        label: 'Mascotas Registradas',
        value: this.totalPets(),
        icon: 'custom__pet-icon',
        color: 'text-pink-500',
      },
      {
        label: 'Usuarios Activos',
        value: this.totalUsers(),
        icon: 'pi pi-users',
        color: 'text-blue-500',
      },
      {
        label: 'Adopciones Totales',
        value: this.totalAdopted(),
        icon: 'pi pi-home',
        color: 'text-green-500',
      },
      {
        label: 'Solicitudes Pendientes',
        value: this.totalPending(),
        icon: 'pi pi-clock',
        color: 'text-orange-500',
      },
    ];
  }

  ngOnInit(): void {
    this.petService.getAllPets({ page: 1, limit: 1 }).subscribe({
      next: (res) => {
        if (res.pagination) this.totalPets.set(res.pagination.totalItems);
      },
    });

    this.petService.getAllPets({ page: 1, limit: 1, adopted: true }).subscribe({
      next: (res) => {
        if (res.pagination) this.totalAdopted.set(res.pagination.totalItems);
      },
    });

    this.adminService.getAllUsers({ page: 1, limit: 1 }).subscribe({
      next: (res) => {
        if (res.pagination) this.totalUsers.set(res.pagination.totalItems);
      },
    });

    this.adoptionService.getAllRequests({ page: 1, limit: 1, status: 'pending' }).subscribe({
      next: (res) => {
        if (res.pagination) this.totalPending.set(res.pagination.totalItems);
      },
    });
  }
}
