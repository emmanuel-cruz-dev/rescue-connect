import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRIMENG_IMPORTS } from '../../../primeng/primeng.imports';

@Component({
  selector: 'app-nav-button',
  imports: [RouterLink, PRIMENG_IMPORTS],
  templateUrl: './nav-button.html',
})
export class NavButton {
  @Input() label = '';
  @Input() icon = '';
  @Input() routerLink?: string;
  @Input() styleClass = '';

  @Output() clicked = new EventEmitter<void>();

  baseStyle =
    'rounded-full sm:rounded-md text-surface-700 dark:text-surface-300 hover:text-primary hover:bg-slate-200 dark:hover:bg-slate-700';

  onClick() {
    this.clicked.emit();
  }
}
