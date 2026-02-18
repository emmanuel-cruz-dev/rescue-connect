import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';
import { PetFilters as PetFiltersModel } from '../../../../core/models/pet.model';
import { MessageService } from 'primeng/api';
import { PetCard } from '../../components/pet-card/pet-card';
import { PetFilters } from '../../components/pet-filters/pet-filters';

@Component({
  selector: 'app-pet-list',
  imports: [CommonModule, RouterModule, FormsModule, PetCard, PetFilters, PRIMENG_IMPORTS],
  templateUrl: './pet-list.html',
})
export class PetList implements OnInit {
  private petService = inject(PetService);
  private messageService = inject(MessageService);

  pets = this.petService.pets;
  pagination = this.petService.pagination;
  loading = this.petService.loading;

  filtersDrawerVisible = false;
  skeletons = Array(6).fill(0);

  filters = signal<PetFiltersModel>({
    page: 1,
    limit: 6,
    adopted: false,
    sortBy: 'createdAt',
    order: 'desc',
  });

  selectedSort = 'createdAt_desc';

  sortOptions = [
    { label: 'Más recientes', value: 'createdAt_desc' },
    { label: 'Más antiguos', value: 'createdAt_asc' },
    { label: 'Nombre A-Z', value: 'name_asc' },
    { label: 'Nombre Z-A', value: 'name_desc' },
    { label: 'Más jóvenes', value: 'birthDate_desc' },
    { label: 'Más mayores', value: 'birthDate_asc' },
  ];

  petTypes: ('perro' | 'gato')[] = ['perro', 'gato'];
  genders: ('macho' | 'hembra')[] = ['macho', 'hembra'];
  sizes: ('pequeño' | 'mediano' | 'grande' | 'extra grande')[] = [
    'pequeño',
    'mediano',
    'grande',
    'extra grande',
  ];

  activeFiltersCount = computed(() => {
    const f = this.filters();
    let count = 0;
    if (f.search) count++;
    if (f.type) count++;
    if (f.gender) count++;
    if (f.size) count++;
    if (f.minAge !== undefined) count++;
    if (f.maxAge !== undefined) count++;
    if (f.isSterilized) count++;
    if (f.isVaccinated) count++;
    return count;
  });

  pageNumbers = computed(() => {
    const p = this.pagination();
    if (!p) return [];

    const total = p.totalPages;
    const current = p.currentPage;
    const pages: number[] = [];

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    pages.push(1);
    if (current > 3) pages.push(-1);

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (current < total - 2) pages.push(-1);
    pages.push(total);

    return pages;
  });

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {
    this.petService.getAllPets(this.filters()).subscribe({
      error: (error) => {
        console.error('Error al cargar mascotas:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar las mascotas',
        });
      },
    });
  }

  onFiltersChange(newFilters: Partial<PetFiltersModel>): void {
    this.filters.update((current) => ({
      ...current,
      ...newFilters,
      page: 1,
    }));
    this.loadPets();
  }

  onSortChange(value: string): void {
    const [sortBy, order] = value.split('_') as [
      PetFiltersModel['sortBy'],
      PetFiltersModel['order']
    ];
    this.filters.update((current) => ({ ...current, sortBy, order, page: 1 }));
    this.loadPets();
  }

  updateFilter(key: keyof PetFiltersModel, value: any): void {
    this.filters.update((current) => ({
      ...current,
      [key]: value,
      page: 1,
    }));
    this.loadPets();
  }

  onSearch(searchTerm: string): void {
    this.updateFilter('search', searchTerm || undefined);
  }

  goToPage(page: number): void {
    this.filters.update((current) => ({ ...current, page }));
    this.loadPets();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextPage(): void {
    const p = this.pagination();
    if (p?.hasNextPage) this.goToPage(p.currentPage + 1);
  }

  prevPage(): void {
    const p = this.pagination();
    if (p?.hasPrevPage) this.goToPage(p.currentPage - 1);
  }

  clearFilters(): void {
    this.selectedSort = 'createdAt_desc';
    this.filters.set({
      page: 1,
      limit: 6,
      adopted: false,
      sortBy: 'createdAt',
      order: 'desc',
    });
    this.loadPets();
  }
}
