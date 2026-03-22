import { Component } from '@angular/core';

import { SaveLivesHero } from '../../components/save-lives-hero/save-lives-hero';
import { CastrationProblem } from '../../components/castration-problem/castration-problem';
import { Benefits } from '../../components/benefits/benefits';

@Component({
  selector: 'app-save-lives',
  imports: [SaveLivesHero, CastrationProblem, Benefits],
  templateUrl: './save-lives.html',
})
export class SaveLives {}
