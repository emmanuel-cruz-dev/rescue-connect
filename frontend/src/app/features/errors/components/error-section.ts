import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

import { PRIMENG_IMPORTS } from '../../../shared';

export interface ErrorAction {
  label: string;
  icon: string;
  routerLink?: string;
  outlined?: boolean;
  styleClass?: string;
  onClick?: () => void;
}

export interface ErrorLink {
  label: string;
  routerLink?: string;
  href?: string;
  onClick?: () => void;
}

@Component({
  selector: 'app-error-section',
  imports: [RouterModule, LucideAngularModule, PRIMENG_IMPORTS],
  templateUrl: './error-section.html',
})
export class ErrorSection {
  @Input({ required: true }) code!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) subDescription!: string;
  @Input({ required: true }) icon!: unknown;
  @Input({ required: true }) lucideIcon?: LucideIconData | undefined;
  @Input({ required: true }) actions!: ErrorAction[];
  @Input({ required: true }) footerHeading!: string;
  @Input({ required: true }) footerLinks!: ErrorLink[];
}
