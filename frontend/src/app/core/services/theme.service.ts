import { Injectable, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  darkMode = signal<boolean>(false);

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.darkMode.set(savedTheme === 'dark' || (!savedTheme && prefersDark));

    effect(() => {
      const isDark = this.darkMode();
      if (isDark) {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  toggleTheme() {
    this.darkMode.update((value) => !value);
  }
}
