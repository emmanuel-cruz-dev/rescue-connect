import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, PRIMENG_IMPORTS],
  templateUrl: './change-password.html',
})
export class ChangePassword {}
