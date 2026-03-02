import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PRIMENG_IMPORTS } from '../../../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-my-adoptions',
  imports: [RouterModule, PRIMENG_IMPORTS],
  templateUrl: './my-adoptions.html',
})
export class MyAdoptions {}
