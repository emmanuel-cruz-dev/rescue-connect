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
  items: MenuItem[] | undefined;

  constructor(public themeService: ThemeService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Login',
        icon: 'pi pi-user',
        routerLink: '/auth/login',
      },
      {
        label: 'Register',
        icon: 'pi pi-user-plus',
        routerLink: '/auth/register',
      },
      {
        label: 'Projects',
        icon: 'pi pi-search',
        badge: '3',
        items: [
          {
            label: 'Core',
            icon: 'pi pi-bolt',
            shortcut: '⌘+S',
          },
          {
            label: 'Blocks',
            icon: 'pi pi-server',
            shortcut: '⌘+B',
          },
          {
            separator: true,
          },
          {
            label: 'UI Kit',
            icon: 'pi pi-pencil',
            shortcut: '⌘+U',
          },
        ],
      },
    ];
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
