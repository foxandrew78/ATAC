import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarService } from '../../../shared/services/sidebar.service';
import { LinksContainerComponent } from './links-container/links-container.component';
import { AtacSettingsComponent } from '../settings/atac-settings/atac-settings.component';
import { ArccLinksComponent } from './arcc-links/arcc-links.component';
import { AtacLinksComponent } from './atac-links/atac-links.component';
import { PassdownLinksComponent } from './passdown-links/passdown-links.component';

@Component({
  selector: 'app-links-list',
  standalone: true,
  imports: [
    RouterLink,
    LinksContainerComponent,
    AtacSettingsComponent,
    ArccLinksComponent,
    AtacLinksComponent,
    PassdownLinksComponent,
  ],
  templateUrl: './links-list.component.html',
  styleUrl: './links-list.component.scss',
})
export class LinksListComponent {
  sideBarService = inject(SidebarService);
  currentRoute = this.sideBarService.currentRoute;

  onLinkClick = () => {
    this.sideBarService.closeSidebar();
  };
}
