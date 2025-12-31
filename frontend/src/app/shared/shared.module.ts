import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from './primeng/primeng.module';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

const COMPONENTS = [Navbar, Footer];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, PrimeNgModule],
  exports: [PrimeNgModule, ...COMPONENTS],
})
export class SharedModule {}
