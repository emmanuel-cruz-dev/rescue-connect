import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../shared/components/navbar/navbar';
import { PRIMENG_IMPORTS } from '../../shared/primeng/primeng.imports';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterModule, Navbar, PRIMENG_IMPORTS],
  templateUrl: './auth-layout.html',
})
export class AuthLayout {}
