import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ThemeService } from '../../../core/services/theme.service';
import { PRIMENG_IMPORTS } from '../../primeng/primeng.imports';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, PRIMENG_IMPORTS],
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
        icon: 'custom__pet-icon',
        routerLink: '/pets',
      },
    ];
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
