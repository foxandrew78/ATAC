import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AtacSettingsComponent } from './atac-settings/atac-settings.component';
import { GenericSettingsComponent } from './generic-settings/generic-settings.component';
import { PassdownSettingsComponent } from './passdown-settings/passdown-settings.component';
import { SettingsContainerComponent } from './settings-container/settings-container.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    AtacSettingsComponent,
    GenericSettingsComponent,
    PassdownSettingsComponent,
    SettingsContainerComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  router = new Router();
  routesWithSettings = ['ATAC'];
  currentRoute: string = '';

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects.slice(1);
      });
  }
}
