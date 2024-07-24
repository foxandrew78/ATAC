import { Component, inject, input } from '@angular/core';
import { linksList } from '../navbar.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from '../../../shared/services/sidebar.service';

@Component({
  selector: 'app-nav-links',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-links.component.html',
  styleUrl: './nav-links.component.scss',
})
export class NavLinksComponent {
  private sideBarService = inject(SidebarService);
  sideBarIsOpen = this.sideBarService.sideBarIsOpen;
  linksList = input.required<linksList[]>();
}
