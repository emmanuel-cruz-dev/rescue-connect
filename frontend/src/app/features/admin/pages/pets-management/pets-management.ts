import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-pets-management',
  imports: [RouterModule, PRIMENG_IMPORTS],
  templateUrl: './pets-management.html',
})
export class PetsManagement {}
