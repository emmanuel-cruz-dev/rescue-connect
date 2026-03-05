import { Component, inject, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { LucideAngularModule, FishIcon, BoneIcon } from 'lucide-angular';
import { PetService } from '../../../pets/services/pet.service';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';
import { IPet, PetFilters } from '../../../../core/models';

type SizeSeverity = 'success' | 'info' | 'warn' | 'danger' | 'secondary';

@Component({
  selector: 'app-pets-management',
  imports: [RouterModule, FormsModule, LucideAngularModule, PRIMENG_IMPORTS],
  providers: [ConfirmationService],
  templateUrl: './pets-management.html',
})
export class PetsManagement implements OnInit, OnDestroy {
  private petService = inject(PetService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private globalSearchSubject = new Subject<string>();
  readonly Fish = FishIcon;
  readonly Bone = BoneIcon;

  pets = this.petService.pets;
  pagination = this.petService.pagination;
  loading = this.petService.loading;
  @ViewChild('dt') dt!: Table;

  globalFilter = '';

  petTypeOptions = [
    { label: 'Tipo', value: undefined },
    { label: 'Perros', value: 'perro' },
    { label: 'Gatos', value: 'gato' },
  ];

  adoptionStatusOptions = [
    { label: 'Estado', value: undefined },
    { label: 'Disponibles', value: false },
    { label: 'Adoptadas', value: true },
  ];

  filters: PetFilters = {
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    order: 'desc',
  };

  ngOnInit(): void {
    this.globalSearchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe((value) => {
      this.filters.search = value || undefined;
      this.filters.page = 1;
      this.loadPets();
    });

    this.loadPets();
  }

  loadPets(): void {
    this.petService.getAllPets(this.filters).subscribe({
      error: () => {
        throw new Error('Error al cargar las mascotas');
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
      if (field === 'createdAt' || field === 'name' || field === 'birthDate' || field === 'size') {
        this.filters.sortBy = field;
      }
      this.filters.order = event.sortOrder === 1 ? 'asc' : 'desc';
    }

    this.loadPets();
  }

  onGlobalFilter(value: string): void {
    const cleanedValue = value.trim().replace(/\s+/g, ' ');
    this.globalSearchSubject.next(cleanedValue);
  }

  onTypeFilterChange(value: 'perro' | 'gato' | undefined): void {
    this.filters.type = value;
    this.filters.page = 1;
    this.loadPets();
  }

  onAdoptionFilterChange(value: boolean | undefined): void {
    this.filters.adopted = value;
    this.filters.page = 1;
    this.loadPets();
  }

  resetFilters(): void {
    this.globalFilter = '';

    this.filters = {
      page: 1,
      limit: 10,
      sortBy: 'createdAt',
      order: 'desc',
    };

    this.dt.clear();
    this.loadPets();
  }

  get hasActiveFilters(): boolean {
    return (
      !!this.globalFilter ||
      this.filters.type !== undefined ||
      this.filters.adopted !== undefined ||
      this.filters.sortBy !== 'createdAt' ||
      this.filters.order !== 'desc'
    );
  }

  confirmDelete(pet: IPet): void {
    this.confirmationService.confirm({
      message: `¿Estás seguro de que querés eliminar a <strong>${pet.name}</strong>? Esta acción no se puede deshacer.`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass:
        'p-button-danger bg-red-600! border-red-600! hover:bg-red-700! text-white!',
      rejectButtonStyleClass:
        'p-button-text text-gray-500! bg-gray-100! hover:!bg-gray-200 dark:text-white! dark:bg-slate-800/20! dark:hover:bg-slate-800/30!',
      accept: () => this.deletePet(pet),
    });
  }

  private deletePet(pet: IPet): void {
    this.petService.deletePet(pet._id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminada',
          detail: `${pet.name} fue eliminada correctamente`,
        });
        this.loadPets();
      },
      error: () => {
        throw new Error('Error al eliminar el mascote');
      },
    });
  }

  getAgeFromBirthDate(birthDate: Date | string): string {
    const birth = new Date(birthDate);
    const now = new Date();
    const months =
      (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
    if (months < 12) return `${months} mes${months !== 1 ? 'es' : ''}`;
    const years = Math.floor(months / 12);
    return `${years} año${years !== 1 ? 's' : ''}`;
  }

  getPetTypeIcon(type: string) {
    return type === 'perro' ? this.Bone : this.Fish;
  }

  getSizeSeverity(size: string): SizeSeverity {
    const map: Record<string, SizeSeverity> = {
      pequeño: 'success',
      mediano: 'info',
      grande: 'warn',
      'extra grande': 'danger',
    };
    return map[size] ?? 'secondary';
  }

  ngOnDestroy(): void {
    this.globalSearchSubject.complete();
  }
}
