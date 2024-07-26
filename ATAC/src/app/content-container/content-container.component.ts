import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarService } from '../shared/services/sidebar.service';
import { RouterOutlet } from '@angular/router';
import { SettingsComponent } from '../content/settings/settings.component';

@Component({
  selector: 'app-content-container',
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet, SettingsComponent],
  templateUrl: './content-container.component.html',
  styleUrl: './content-container.component.scss',
})
export class ContentContainerComponent {
  private sideBarService = inject(SidebarService);
  sidebarStatus = this.sideBarService.sideBarIsOpen;

  onCloseSideNav = (method: 'esc' | 'backdrop') => {
    this.sideBarService.toggleSidebar(method);
  };
}
