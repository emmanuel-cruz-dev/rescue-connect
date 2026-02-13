import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterModule, Navbar],
  templateUrl: './auth-layout.html',
})
export class AuthLayout {}
