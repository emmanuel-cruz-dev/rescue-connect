import { Component, inject, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { AdminService } from '../../services/admin.service';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';
import { IUser, UserFilters } from '../../../../core/models/user.model';

@Component({
  selector: 'app-users-management',
  imports: [RouterModule, FormsModule, PRIMENG_IMPORTS],
  providers: [ConfirmationService],
  templateUrl: './users-management.html',
})
export class UsersManagement implements OnInit {
  private adminService = inject(AdminService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private globalSearchSubject = new Subject<string>();

  users = this.adminService.users;
  pagination = this.adminService.pagination;
  loading = this.adminService.loading;

  @ViewChild('dt') dt!: Table;
  globalFilter = '';

  roleOptions = [
    { label: 'Rol', value: undefined },
    { label: 'Usuarios', value: 'user' },
    { label: 'Admins', value: 'admin' },
  ];

  statusOptions = [
    { label: 'Estado', value: undefined },
    { label: 'Activos', value: true },
    { label: 'Inactivos', value: false },
  ];

  filters: UserFilters = {
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    order: 'desc',
  };

  ngOnInit(): void {
    this.globalSearchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe((value) => {
      this.filters.search = value || undefined;
      this.filters.page = 1;
      this.loadUsers();
    });

    this.loadUsers();
  }

  loadUsers(): void {
    this.adminService.users.set([]);
    this.adminService.getAllUsers(this.filters).subscribe({
      error: () => {
        throw new Error('Error al cargar los usuarios');
      },
    });
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    const rows = event.rows ?? 10;
    const first = event.first ?? 0;
    this.filters.page = Math.floor(first / rows) + 1;
    this.filters.limit = rows;

    if (event.sortField) {
      const field = Array.isArray(event.sortField) ? event.sortField[0] : event.sortField;
      if (
        field === 'createdAt' ||
        field === 'firstName' ||
        field === 'lastName' ||
        field === 'email'
      ) {
        this.filters.sortBy = field;
      }
      this.filters.order = event.sortOrder === 1 ? 'asc' : 'desc';
    }

    this.loadUsers();
  }

  onGlobalFilter(value: string): void {
    const cleanedValue = value.trim().replace(/\s+/g, ' ');
    this.globalSearchSubject.next(cleanedValue);
  }

  onRoleFilterChange(value: 'user' | 'admin' | undefined): void {
    this.filters.role = value;
    this.filters.page = 1;
    this.loadUsers();
  }

  onStatusFilterChange(value: boolean | undefined): void {
    this.filters.isActive = value;
    this.filters.page = 1;
    this.loadUsers();
  }

  resetFilters(): void {
    this.globalFilter = '';
    this.filters = { page: 1, limit: 10, sortBy: 'createdAt', order: 'desc' };
    this.dt.clear();
    this.loadUsers();
  }

  get hasActiveFilters(): boolean {
    return (
      !!this.globalFilter ||
      this.filters.role !== undefined ||
      this.filters.isActive !== undefined ||
      this.filters.sortBy !== 'createdAt' ||
      this.filters.order !== 'desc'
    );
  }

  confirmDelete(user: IUser): void {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que querés eliminar a <strong>${user.firstName} ${user.lastName}</strong>? Esta acción no se puede deshacer.`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass:
        'p-button-danger bg-red-600! border-red-600! hover:bg-red-700! text-white!',
      rejectButtonStyleClass:
        'p-button-text text-gray-500! bg-gray-100! hover:!bg-gray-200 dark:text-white! dark:bg-slate-800/20! dark:hover:bg-slate-800/30!',
      accept: () => this.deleteUser(user),
    });
  }

  private deleteUser(user: IUser): void {
    this.adminService.deleteUser(user._id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: `${user.firstName} fue eliminado correctamente`,
          life: 3000,
        });
        this.loadUsers();
      },
      error: () => {
        throw new Error('Error al eliminar el usuario');
      },
    });
  }

  getRoleSeverity(role: string): 'danger' | 'info' {
    return role === 'admin' ? 'danger' : 'info';
  }

  ngOnDestroy(): void {
    this.globalSearchSubject.complete();
  }
}
