import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from './primeng/primeng.module';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { PetCard } from '../features/pets/components/pet-card/pet-card';
import { PetGallery } from '../features/pets/components/pet-gallery/pet-gallery';

const COMPONENTS = [Navbar, Footer, PetCard, PetGallery];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, PrimeNgModule],
  exports: [PrimeNgModule, ...COMPONENTS],
})
export class SharedModule {}
