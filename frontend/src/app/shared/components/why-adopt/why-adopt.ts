import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PRIMENG_IMPORTS } from '../../primeng';

@Component({
  selector: 'app-why-adopt',
  imports: [RouterLink, PRIMENG_IMPORTS],
  templateUrl: './why-adopt.html',
})
export class WhyAdopt {}
