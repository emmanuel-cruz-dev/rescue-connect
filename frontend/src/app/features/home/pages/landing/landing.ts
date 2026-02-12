import { Component, OnInit } from '@angular/core';
import { HeroSection } from '../../components/hero-section/hero-section';
import { FeaturedPets } from '../../components/featured-pets/featured-pets';
import { HowItWorks } from '../../components/how-it-works/how-it-works';
import { Testimonials } from '../../components/testimonials/testimonials';
import { Faq } from '../../components/faq/faq';

@Component({
  selector: 'app-landing',
  imports: [HeroSection, FeaturedPets, HowItWorks, Testimonials, Faq],
  templateUrl: './landing.html',
})
export class Landing implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
