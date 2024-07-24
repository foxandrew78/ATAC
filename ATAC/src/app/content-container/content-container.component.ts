import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarService } from '../shared/services/sidebar.service';

@Component({
  selector: 'app-content-container',
  standalone: true,
  imports: [MatSidenavModule],
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
