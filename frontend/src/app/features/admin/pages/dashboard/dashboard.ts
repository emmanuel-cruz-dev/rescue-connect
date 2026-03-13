import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PawPrintIcon, LucideAngularModule } from 'lucide-angular';

import { AuthService } from '../../../../core/services';
import { AdminService } from '../../services/admin.service';
import { AdoptionService } from '../../../adoptions/services/adoption.service';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';
import { AdoptionStatus } from '../../../../core/models';

type StatusSeverity = 'success' | 'info' | 'warn' | 'danger' | 'secondary';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, LucideAngularModule, PRIMENG_IMPORTS],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private authService = inject(AuthService);
  private adminService = inject(AdminService);
  private adoptionService = inject(AdoptionService);

  readonly PawPrintIcon = PawPrintIcon;
  readonly today = new Date();
  readonly formattedToday = new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'full',
  }).format(this.today);

  currentUser = this.authService.currentUser;
  totalUsers = signal(0);
  totalPets = signal(0);
  totalAdopted = signal(0);
  totalPending = signal(0);
  totalAvailable = signal(0);
  totalApproved = signal(0);
  totalRejected = signal(0);
  monthlyStats = signal<any[]>([]);
  adoptions = signal<any[]>([]);

  totalYearAdoptions = computed(() => this.monthlyStats().reduce((sum, m) => sum + m.total, 0));
  currentMonthRequests = computed(() => {
    const month = new Date().getMonth() + 1;
    return this.monthlyStats().find((m) => m.month === month)?.total ?? 0;
  });
  recentAdoptions = computed(() =>
    this.adoptions().sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  );

  doughnutData = computed(() => ({
    labels: ['Adoptadas', 'Disponibles'],
    datasets: [
      {
        data: [this.totalAdopted(), this.totalAvailable()],
        backgroundColor: ['#22c55e', '#ec4899'],
        hoverBackgroundColor: ['#16a34a', '#db2777'],
        borderWidth: 0,
      },
    ],
  }));
  barData = computed(() => ({
    labels: ['Pendientes', 'Aprobadas', 'Rechazadas'],
    datasets: [
      {
        label: 'Solicitudes',
        data: [this.totalPending(), this.totalApproved(), this.totalRejected()],
        backgroundColor: ['#fdba74', '#22c55e', '#f97316'],
        hoverBackgroundColor: ['#f97316', '#22c55e', '#ec4899'],
        borderRadius: 8,
        borderWidth: 1,
      },
    ],
  }));
  lineData = computed(() => {
    const stats = this.monthlyStats();
    return {
      labels: stats.map((s) =>
        new Date(this.today.getFullYear(), s.month - 1).toLocaleString('es-AR', { month: 'short' })
      ),
      datasets: [
        {
          label: 'Total',
          data: stats.map((s) => s.total),
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99,102,241,0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Aprobadas',
          data: stats.map((s) => s.approved),
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34,197,94,0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Pendientes',
          data: stats.map((s) => s.pending),
          borderColor: '#f97316',
          backgroundColor: 'rgba(249,115,22,0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Rechazadas',
          data: stats.map((s) => s.rejected),
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239,68,68,0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    };
  });

  doughnutOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: { padding: 10, font: { size: 11 } },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  barOptions = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, precision: 0 },
        grid: { display: true, color: 'rgba(148, 163, 184, 0.1)' },
      },
      x: {
        grid: { display: true, color: 'rgba(148, 163, 184, 0.1)' },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  lineOptions = {
    plugins: { legend: { position: 'bottom' } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, precision: 0 },
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
      },
      x: { grid: { display: true, color: 'rgba(148, 163, 184, 0.1)' } },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  get stats() {
    return [
      {
        label: 'Mascotas Registradas',
        value: this.totalPets(),
        icon: 'custom__pet-icon',
        color: 'text-pink-500 dark:text-pink-400',
        bg: 'bg-pink-50 dark:bg-pink-950/30',
      },
      {
        label: 'Usuarios Activos',
        value: this.totalUsers(),
        icon: 'pi pi-users',
        color: 'text-blue-500',
        bg: 'bg-blue-50 dark:bg-blue-950/30',
      },
      {
        label: 'Adopciones Totales',
        value: this.totalAdopted(),
        icon: 'custom__adoption-icon',
        color: 'text-green-500',
        bg: 'bg-green-50 dark:bg-green-950/30',
      },
      {
        label: 'Solicitudes Pendientes',
        value: this.totalPending(),
        icon: 'pi pi-clock',
        color: 'text-orange-500',
        bg: 'bg-orange-50 dark:bg-orange-950/30',
      },
    ];
  }

  getStatusSeverity(status: AdoptionStatus): StatusSeverity {
    const map: Record<AdoptionStatus, StatusSeverity> = {
      pending: 'warn',
      approved: 'success',
      rejected: 'danger',
      cancelled: 'secondary',
    };
    return map[status];
  }

  getStatusLabel(status: AdoptionStatus): string {
    const map: Record<AdoptionStatus, string> = {
      pending: 'Pendiente',
      approved: 'Aprobada',
      rejected: 'Rechazada',
      cancelled: 'Cancelada',
    };
    return map[status];
  }

  ngOnInit(): void {
    forkJoin({
      dashboard: this.adminService.getDashboardStats(),
      monthly: this.adminService.getMonthlyStats(),
      adoptions: this.adoptionService.getAllRequests({ limit: 5 }),
    }).subscribe({
      next: ({ dashboard, monthly }) => {
        const d = dashboard.data;
        this.totalUsers.set(d.users);
        this.totalPets.set(d.pets);
        this.totalAdopted.set(d.adopted);
        this.totalAvailable.set(d.availablePets);
        this.totalPending.set(d.pendingRequests);
        this.totalApproved.set(d.approvedRequests);
        this.totalRejected.set(d.rejectedRequests);
        this.monthlyStats.set(monthly.data);
        this.adoptions.set(this.adoptionService.requests());
      },
      error: () => {
        throw new Error('Error al obtener estadísticas');
      },
    });
  }
}
