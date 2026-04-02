import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PRIMENG_IMPORTS } from '../../../../shared';

@Component({
  selector: 'app-hero-section',
  imports: [RouterModule, PRIMENG_IMPORTS],
  templateUrl: './hero-section.html',
})
export class HeroSection {}
