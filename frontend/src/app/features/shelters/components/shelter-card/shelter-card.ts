import { Component, Input } from '@angular/core';

import { PRIMENG_IMPORTS } from '../../../../shared';

interface Shelter {
  id: number;
  name: string;
  image: string;
  logo: string;
  location: string;
  website: string;
  description: string;
}

@Component({
  selector: 'app-shelter-card',
  imports: [PRIMENG_IMPORTS],
  templateUrl: './shelter-card.html',
})
export class ShelterCard {
  @Input({ required: true }) shelter!: Shelter;
}
