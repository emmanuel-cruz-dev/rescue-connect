import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-adopt',
  imports: [RouterModule, PRIMENG_IMPORTS],
  templateUrl: './adopt.html',
})
export class Adopt {}
