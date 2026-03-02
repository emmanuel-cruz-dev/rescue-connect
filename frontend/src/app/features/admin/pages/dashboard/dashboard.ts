import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
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
    forkJoin({
      pets: this.petService.getAllPets({ page: 1, limit: 1 }),
      adopted: this.petService.getAllPets({ page: 1, limit: 1, adopted: true }),
      users: this.adminService.getAllUsers({ page: 1, limit: 1 }),
      pending: this.adoptionService.getAllRequests({ page: 1, limit: 1, status: 'PENDING' } as any),
    }).subscribe({
      next: (res) => {
        this.totalPets.set(res.pets.pagination?.totalItems ?? 0);
        this.totalAdopted.set(res.adopted.pagination?.totalItems ?? 0);
        this.totalUsers.set(res.users.pagination?.totalItems ?? 0);
        this.totalPending.set(res.pending.pagination?.totalItems ?? 0);
      },
      error: (err) => {
        console.error('Error fetching dashboard data:', err);
        this.totalPets.set(0);
        this.totalAdopted.set(0);
        this.totalUsers.set(0);
        this.totalPending.set(0);
      },
    });
  }
}
