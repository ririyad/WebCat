import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CollapseDirective } from 'ng2-bootstrap/ng2-bootstrap';

import { AppSettings } from './shared/app.config';

@Component({
  selector: 'webcat',
  templateUrl: 'app/app.component.html',
  directives: [CollapseDirective],
  providers: [Title]
})
export class AppComponent {

  public isCollapsed:boolean = false;
  AppTitle : string;

  constructor(title: Title) {
    this.AppTitle = AppSettings.APP_NAME;
    title.setTitle(this.AppTitle);
  }

}
