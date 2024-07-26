import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { AtacSettingsComponent } from './atac-settings/atac-settings.component';
import { GenericSettingsComponent } from './generic-settings/generic-settings.component';
import { PassdownSettingsComponent } from './passdown-settings/passdown-settings.component';
import { SettingsContainerComponent } from './settings-container/settings-container.component';
import { SidebarService } from '../../../shared/services/sidebar.service';

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
export class SettingsComponent {
  sideBarService = inject(SidebarService);
  routesWithSettings = ['ATAC'];
  currentRoute = this.sideBarService.currentRoute;
}
