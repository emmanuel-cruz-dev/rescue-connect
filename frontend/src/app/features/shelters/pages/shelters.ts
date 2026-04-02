import { Component } from '@angular/core';

import { ShelterList } from '../components/shelter-list/shelter-list';

@Component({
  selector: 'app-shelters',
  imports: [ShelterList],
  templateUrl: './shelters.html',
})
export class Shelters {}
