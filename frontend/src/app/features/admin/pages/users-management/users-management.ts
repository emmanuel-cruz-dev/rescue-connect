import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-users-management',
  imports: [RouterModule, PRIMENG_IMPORTS],
  templateUrl: './users-management.html',
})
export class UsersManagement {}
