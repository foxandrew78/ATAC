import { Component, inject, input } from '@angular/core';
import { ATACLinks } from '../links-list.data';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../../../shared/services/sidebar.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-atac-links',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule],
  templateUrl: './atac-links.component.html',
  styleUrl: './atac-links.component.scss',
})
export class AtacLinksComponent {
  sideBarService = inject(SidebarService);
  linksList = ATACLinks;
  currentRoute = this.sideBarService.currentRoute;

  onLinkClick = () => {
    this.sideBarService.closeSidebar();
  };
}
