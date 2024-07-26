import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
}
