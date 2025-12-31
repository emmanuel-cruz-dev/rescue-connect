import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  standalone: false,
})
export class Navbar implements OnInit {
  items: MenuItem[] | undefined;

  constructor(public themeService: ThemeService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
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
