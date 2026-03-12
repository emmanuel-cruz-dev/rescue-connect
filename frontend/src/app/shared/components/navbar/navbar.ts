import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { AuthService, ThemeService } from '../../../core/services';
import { NavButton } from './nav-button/nav-button';
import { PRIMENG_IMPORTS } from '../../primeng/primeng.imports';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NavButton, PRIMENG_IMPORTS],
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit {
  authService = inject(AuthService);
  themeService = inject(ThemeService);

  items: MenuItem[] = [];
  userMenuItems: MenuItem[] = [];

  get userInitials(): string {
    const user = this.authService.getCurrentUser();
    if (!user?.firstName || !user?.lastName) return '';

    const parts = [user.firstName, user.lastName].map((p) => p[0]).join('');
    return parts.toUpperCase();
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Mascotas',
        icon: 'custom__pet-icon',
        routerLink: '/pets',
      },
    ];

    this.userMenuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-objects-column',
        routerLink: '/admin/dashboard',
        visible: this.authService.isAdmin(),
      },
      {
        label: 'Mi perfil',
        icon: 'pi pi-user',
        routerLink: '/profile',
        visible: !this.authService.isAdmin(),
      },
      {
        separator: true,
      },
      {
        label: 'Salir',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout() {
    this.authService.logout().subscribe();
  }
}
