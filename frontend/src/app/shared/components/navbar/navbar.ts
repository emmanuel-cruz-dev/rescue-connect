import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
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

  constructor(public themeService: ThemeService, private router: Router) {}

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
      {
        label: 'Cómo funciona',
        icon: 'pi pi-info-circle',
        command: () => this.scrollToSection('how-it-works'),
      },
    ];

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const fragment = this.router.parseUrl(this.router.url).fragment;
      if (fragment) {
        this.scrollToElementWithDelay(fragment, 300);
      }
    });
  }

  scrollToSection(sectionId: string) {
    if (this.router.url !== '/') {
      this.router.navigate(['/'], { fragment: sectionId });
    } else {
      this.scrollToElementWithDelay(sectionId, 100);
    }
  }

  private scrollToElementWithDelay(sectionId: string, delay: number = 100) {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, delay);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
