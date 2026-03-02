import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-change-password',
  imports: [RouterModule, ReactiveFormsModule, PRIMENG_IMPORTS],
  templateUrl: './change-password.html',
})
export class ChangePassword {}
