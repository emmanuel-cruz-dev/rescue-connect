import { Component, input, output, signal, effect, computed, OnDestroy } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, FishIcon, BoneIcon } from 'lucide-angular';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';
import { PetFilters as PetFiltersModel } from '../../../../core/models/pet.model';

@Component({
  selector: 'app-pet-filters',
  imports: [CommonModule, FormsModule, LucideAngularModule, PRIMENG_IMPORTS],
  templateUrl: './pet-filters.html',
})
export class PetFilters implements OnDestroy {
  readonly Fish = FishIcon;
  readonly Bone = BoneIcon;

  filters = input.required<PetFiltersModel>();
  filtersChange = output<Partial<PetFiltersModel>>();
  clearFilters = output<void>();

  searchValue = signal('');
  selectedType = signal<string | undefined>(undefined);
  selectedGender = signal<string | undefined>(undefined);
  selectedSize = signal<string | undefined>(undefined);
  minAge = signal<number | undefined>(undefined);
  maxAge = signal<number | undefined>(undefined);
  isSterilized = signal(false);
  isVaccinated = signal(false);

  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe((value) => {
      this.filtersChange.emit({ search: value || undefined });
    });
  }

  syncFiltersEffect = effect(() => {
    const f = this.filters();

    this.searchValue.set(f.search ?? '');
    this.selectedType.set(f.type);
    this.selectedGender.set(f.gender);
    this.selectedSize.set(f.size);
    this.minAge.set(f.minAge);
    this.maxAge.set(f.maxAge);
    this.isSterilized.set(!!f.isSterilized);
    this.isVaccinated.set(!!f.isVaccinated);
  });

  petTypes = [
    { label: 'Perro', value: 'perro', icon: BoneIcon },
    { label: 'Gato', value: 'gato', icon: FishIcon },
  ];

  genderOptions = [
    { label: 'Macho', value: 'macho' },
    { label: 'Hembra', value: 'hembra' },
  ];

  sizeOptions = [
    { label: 'Pequeño', value: 'pequeño' },
    { label: 'Mediano', value: 'mediano' },
    { label: 'Grande', value: 'grande' },
    { label: 'Extra grande', value: 'extra grande' },
  ];

  onSearch(value: string): void {
    this.searchValue.set(value);
    const cleanedValue = value.trim().replace(/\s+/g, ' ');
    this.searchSubject.next(cleanedValue);
  }

  ngOnDestroy(): void {
    this.searchSubject.complete();
  }

  onTypeChange(value: string | undefined): void {
    this.selectedType.set(value);
    this.filtersChange.emit({ type: value as PetFiltersModel['type'] });
  }

  onGenderChange(value: string | undefined): void {
    this.selectedGender.set(value);
    this.filtersChange.emit({ gender: value as PetFiltersModel['gender'] });
  }

  onSizeChange(value: string | undefined): void {
    this.selectedSize.set(value);
    this.filtersChange.emit({ size: value as PetFiltersModel['size'] });
  }

  onMinAgeChange(value: string): void {
    const num = value ? +value : undefined;
    this.minAge.set(num);

    const currentMax = this.maxAge();
    if (num !== undefined && currentMax !== undefined && num > currentMax) {
      this.maxAge.set(undefined);
      this.filtersChange.emit({ minAge: num, maxAge: undefined });
    } else {
      this.filtersChange.emit({ minAge: num });
    }
  }

  onMaxAgeChange(value: string): void {
    const num = value ? +value : undefined;
    this.maxAge.set(num);

    const currentMin = this.minAge();
    if (num !== undefined && currentMin !== undefined && num < currentMin) {
      this.minAge.set(undefined);
      this.filtersChange.emit({ maxAge: num, minAge: undefined });
    } else {
      this.filtersChange.emit({ maxAge: num });
    }
  }

  onSterilizedChange(checked: boolean): void {
    this.isSterilized.set(checked);
    this.filtersChange.emit({ isSterilized: checked || undefined });
  }

  onVaccinatedChange(checked: boolean): void {
    this.isVaccinated.set(checked);
    this.filtersChange.emit({ isVaccinated: checked || undefined });
  }

  onClearFilters(): void {
    this.searchValue.set('');
    this.selectedType.set(undefined);
    this.selectedGender.set(undefined);
    this.selectedSize.set(undefined);
    this.minAge.set(undefined);
    this.maxAge.set(undefined);
    this.isSterilized.set(false);
    this.isVaccinated.set(false);

    this.filtersChange.emit({ search: undefined });
    this.clearFilters.emit();
  }

  activeCount = computed(() => {
    let count = 0;
    if (this.searchValue()) count++;
    if (this.selectedType()) count++;
    if (this.selectedGender()) count++;
    if (this.selectedSize()) count++;
    if (this.minAge() !== undefined) count++;
    if (this.maxAge() !== undefined) count++;
    if (this.isSterilized()) count++;
    if (this.isVaccinated()) count++;
    return count;
  });
}
