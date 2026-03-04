import { Component, OnInit } from '@angular/core';
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
  items: MenuItem[] = [];

  constructor(public authService: AuthService, public themeService: ThemeService) {}

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
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout() {
    this.authService.logout().subscribe();
  }
}
