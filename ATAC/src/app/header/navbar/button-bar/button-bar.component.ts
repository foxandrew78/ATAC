import { Component, inject, input } from '@angular/core';
import { SidebarService } from '../../../shared/services/sidebar.service';
import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
import { buttonList } from '../navbar.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button-bar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './button-bar.component.html',
  styleUrl: './button-bar.component.scss',
})
export class ButtonBarComponent {
  private sideBarService = inject(SidebarService);
  sideBarIsOpen = this.sideBarService.sideBarIsOpen;

  buttonList = input.required<buttonList[]>();
  iconColour = input<'primary' | 'secondary' | 'tertiary' | 'error'>();

  onOpenSidebar = (contentToShow: 'settings' | 'links') => {
    this.sideBarService.openSidebar(contentToShow);
  };
  onCloseSidebar = () => {
    this.sideBarService.closeSidebar();
  };
}
