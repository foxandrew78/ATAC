import { Component, inject } from '@angular/core';
import { SidebarService } from '../../shared/services/sidebar.service';
import { NavLinksComponent } from './nav-links/nav-links.component';
import { ButtonBarComponent } from './button-bar/button-bar.component';
import { BUTTON_LIST, LINKS_LIST } from './nav-links.data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NavLinksComponent, ButtonBarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private sideBarService = inject(SidebarService);
  sideBarIsOpen = this.sideBarService.sideBarIsOpen;

  linksList = LINKS_LIST;
  buttonList = BUTTON_LIST;
}
