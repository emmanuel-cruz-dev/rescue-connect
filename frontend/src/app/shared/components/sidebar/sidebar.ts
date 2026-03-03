import { Component, inject, input, output } from '@angular/core';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import { PRIMENG_IMPORTS } from '../../primeng/primeng.imports';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, RouterLinkActive, PRIMENG_IMPORTS],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  private authService = inject(AuthService);
  closeSidebar = output<void>();
  showHeader = input<boolean>(true);

  constructor(public themeService: ThemeService) {}

  currentUser = this.authService.currentUser;

  adminNavItems: NavItem[] = [
    { label: 'Dashboard', icon: 'pi pi-th-large', route: '/admin/dashboard' },
    { label: 'Mascotas', icon: 'custom__pet-icon', route: '/admin/pets' },
    { label: 'Usuarios', icon: 'pi pi-users', route: '/admin/users' },
    { label: 'Adopciones', icon: 'pi pi-home', route: '/admin/adoptions' },
    { label: 'Mi Perfil', icon: 'pi pi-user', route: '/admin/me' },
    { label: 'Seguridad', icon: 'pi pi-lock', route: '/admin/change-password' },
  ];

  userNavItems: NavItem[] = [
    { label: 'Mi Perfil', icon: 'pi pi-user', route: '/profile/me' },
    { label: 'Mis Adopciones', icon: 'pi pi-heart', route: '/profile/adoptions' },
    { label: 'Seguridad', icon: 'pi pi-lock', route: '/profile/change-password' },
  ];

  get navItems(): NavItem[] {
    const userRole = this.currentUser()?.role;
    if (userRole === 'admin') {
      return [...this.adminNavItems];
    }
    return this.userNavItems;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.authService.logout().subscribe();
  }
}
