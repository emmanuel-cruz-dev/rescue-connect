import { Component } from '@angular/core';

import { AboutHero } from '../../components/about-hero/about-hero';
import { Challenge } from '../../components/challenge/challenge';
import { Founder } from '../../components/founder/founder';
import { MissionVision } from '../../components/mission-vision/mission-vision';
import { PurposeValues } from '../../components/purpose-values/purpose-values';
import { AboutCta } from '../../components/about-cta/about-cta';

@Component({
  selector: 'app-about',
  imports: [AboutHero, Challenge, Founder, MissionVision, PurposeValues, AboutCta],
  templateUrl: './about.html',
})
export class About {}
