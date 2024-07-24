import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { SidebarService } from '../shared/services/sidebar.service';
import { NavbarComponent } from './navbar/navbar.component';
import { BrandingBarComponent } from './branding-bar/branding-bar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NavbarComponent,
    BrandingBarComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private sideBarService = inject(SidebarService);

  sideBarIsOpen = this.sideBarService.sideBarIsOpen;

  linksList: { text: string; destination: string }[] = [
    { text: 'ATAC', destination: 'ATAC' },
    { text: 'ARCC', destination: 'ARCC' },
    { text: 'Passdown', destination: 'Passdown' },
    { text: 'Operations', destination: 'Operations' },
  ];

  onToggleSidebar = () => {
    this.sideBarService.toggleSidebar('button');
  };
}
