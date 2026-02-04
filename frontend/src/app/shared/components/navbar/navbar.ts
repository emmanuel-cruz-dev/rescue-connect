import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ThemeService } from '../../../core/services/theme.service';
import { PRIMENG_IMPORTS } from '../../primeng/primeng.imports';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [PRIMENG_IMPORTS, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit {
  items: MenuItem[] = [];

  constructor(public themeService: ThemeService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Mascotas',
        icon: 'pi pi-heart',
        routerLink: '/pets',
      },
      {
        label: 'Cómo funciona',
        icon: 'pi pi-info-circle',
        routerLink: '/how-it-works',
      },
      {
        label: 'Refugios',
        icon: 'pi pi-building',
        routerLink: '/shelters',
      },
    ];
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
