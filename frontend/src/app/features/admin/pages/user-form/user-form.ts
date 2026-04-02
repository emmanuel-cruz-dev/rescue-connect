import { Component, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { AdminService } from '../../services/admin.service';
import { PRIMENG_IMPORTS } from '../../../../shared';

@Component({
  selector: 'app-user-form',
  imports: [RouterModule, ReactiveFormsModule, PRIMENG_IMPORTS],
  providers: [MessageService],
  templateUrl: './user-form.html',
})
export class UserForm implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private adminService = inject(AdminService);
  private messageService = inject(MessageService);
  private timeoutRef: ReturnType<typeof setTimeout> | null = null;

  isEditMode = !!this.route.snapshot.paramMap.get('id');
  userId = this.route.snapshot.paramMap.get('id');

  saving = signal(false);
  loading = signal(false);
  formSubmitted = signal(false);

  roleOptions = [
    { label: 'Usuario', value: 'user' },
    { label: 'Administrador', value: 'admin' },
  ];

  userForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(254)],
    ],
    password: [
      '',
      this.isEditMode
        ? []
        : [Validators.required, Validators.minLength(8), Validators.maxLength(100)],
    ],
    phone: [''],
    address: [''],
    role: ['user', Validators.required],
    isActive: [true],
  });

  ngOnInit(): void {
    if (this.isEditMode && this.userId) {
      this.loading.set(true);
      this.adminService.getUserById(this.userId).subscribe({
        next: (response: any) => {
          const user = response?.data?.user ?? response?.data;
          if (user) {
            this.userForm.patchValue({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phone: user.phone ?? '',
              address: user.address ?? '',
              role: user.role,
              isActive: user.isActive,
            });
          }

          ['firstName', 'lastName', 'email', 'phone', 'address', 'password'].forEach((field) =>
            this.userForm.get(field)?.disable()
          );

          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo cargar el usuario',
          });
        },
      });
    }
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit(): void {
    this.formSubmitted.set(true);
    if (this.userForm.invalid) return;

    this.saving.set(true);

    const formValue = this.isEditMode
      ? { role: this.userForm.value.role, isActive: this.userForm.value.isActive }
      : { ...this.userForm.value };

    if (!this.isEditMode) {
      if (!formValue.phone?.trim()) delete formValue.phone;
      if (!formValue.address?.trim()) delete formValue.address;
    }

    if (this.isEditMode && this.userId) {
      this.adminService.updateUser(this.userId, formValue).subscribe({
        next: () => this.onSuccess('Usuario actualizado correctamente'),
        error: (err: any) => this.onError(err),
      });
    } else {
      this.adminService.createUser(formValue).subscribe({
        next: () => this.onSuccess('Usuario creado correctamente'),
        error: (err: any) => this.onError(err),
      });
    }
  }

  private onSuccess(detail: string): void {
    this.saving.set(false);
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail, life: 1500 });
    this.timeoutRef = setTimeout(() => this.router.navigate(['/admin/users']), 1200);
  }

  private onError(err: any): void {
    this.saving.set(false);
    const detail = err?.error?.message ?? err?.message ?? 'Ocurrió un error inesperado';
    this.messageService.add({ severity: 'error', summary: 'Error', detail });
  }

  ngOnDestroy(): void {
    if (this.timeoutRef) clearTimeout(this.timeoutRef);
  }
}
