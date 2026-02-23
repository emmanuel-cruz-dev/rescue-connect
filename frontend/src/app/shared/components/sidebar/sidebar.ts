import { Component, inject } from '@angular/core';
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

  constructor(public themeService: ThemeService) {}

  currentUser = this.authService.currentUser;

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'pi pi-th-large', route: '/admin/dashboard' },
    { label: 'Mascotas', icon: 'pi pi-heart', route: '/admin/pets' },
    { label: 'Usuarios', icon: 'pi pi-users', route: '/admin/users' },
    { label: 'Adopciones', icon: 'pi pi-home', route: '/admin/adoptions' },
  ];

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.authService.logout().subscribe();
  }
}
