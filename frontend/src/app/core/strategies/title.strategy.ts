import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleStrategy, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AppTitleStrategy extends TitleStrategy {
  private readonly appName = 'Rescue Connect';

  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot): void {
    const pageTitle = this.buildTitle(routerState);

    if (pageTitle) {
      this.title.setTitle(`${pageTitle} | ${this.appName}`);
    } else {
      this.title.setTitle(this.appName);
    }
  }
}
