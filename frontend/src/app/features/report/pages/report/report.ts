import { Component } from '@angular/core';

import { ReportHero } from '../../components/report-hero/report-hero';
import { HowToReport } from '../../components/how-to-report/how-to-report';
import { StepsToReport } from '../../components/steps-to-report/steps-to-report';
import { ProtectionLaw } from '../../components/protection-law/protection-law';

@Component({
  selector: 'app-report',
  imports: [ReportHero, HowToReport, StepsToReport, ProtectionLaw],
  templateUrl: './report.html',
})
export class Report {}
