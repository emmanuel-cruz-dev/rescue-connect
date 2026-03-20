import { Component, Input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

import { PRIMENG_IMPORTS } from '../../primeng/primeng.imports';

export interface InfoCard {
  icon: LucideIconData;
  iconBgClass: string;
  iconColorClass: string;
  title: string;
  description: string;
}

export interface InfoCardsSectionConfig {
  title: string;
  subtitle: string;
  sectionClass?: string;
  animateCards?: boolean;
}

@Component({
  selector: 'app-info-cards-section',
  imports: [LucideAngularModule, PRIMENG_IMPORTS],
  templateUrl: './info-cards-section.html',
})
export class InfoCardsSection {
  @Input() config!: InfoCardsSectionConfig;
  @Input() cards!: InfoCard[];

  isEmoji(icon: LucideIconData | string): icon is string {
    return typeof icon === 'string';
  }
}
