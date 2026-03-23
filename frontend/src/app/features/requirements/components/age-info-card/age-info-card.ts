import { Component, Input } from '@angular/core';

interface AgeData {
  key: string;
  label: string;
  ageRange: string;
  description: string;
  image: string;
  color: string;
}

@Component({
  selector: 'app-age-info-card',
  imports: [],
  templateUrl: './age-info-card.html',
})
export class AgeInfoCard {
  @Input() stage!: AgeData;
}
