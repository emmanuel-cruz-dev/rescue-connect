import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-adoptions-management',
  imports: [RouterModule, PRIMENG_IMPORTS],
  templateUrl: './adoptions-management.html',
})
export class AdoptionsManagement {}
