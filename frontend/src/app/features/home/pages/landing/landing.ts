import { Component } from '@angular/core';

import { HeroSection } from '../../components/hero-section/hero-section';
import { FeaturedPets } from '../../components/featured-pets/featured-pets';
import { Testimonials } from '../../components/testimonials/testimonials';
import { Adopt } from '../../components/adopt/adopt';
import { Faq } from '../../components/faq/faq';

@Component({
  selector: 'app-landing',
  imports: [HeroSection, FeaturedPets, Testimonials, Adopt, Faq],
  templateUrl: './landing.html',
})
export class Landing {}
