import { Component, inject, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarService } from '../shared/services/sidebar.service';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SettingsComponent } from '../content/sidebar-content/settings/settings.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonBarComponent } from '../header/navbar/button-bar/button-bar.component';
import { LinksListComponent } from '../content/sidebar-content/links-list/links-list.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-content-container',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterOutlet,
    SettingsComponent,
    MatIconModule,
    MatButtonModule,
    ButtonBarComponent,
    LinksListComponent,
  ],
  templateUrl: './content-container.component.html',
  styleUrl: './content-container.component.scss',
})
export class ContentContainerComponent implements OnInit {
  private sideBarService = inject(SidebarService);
  private router = inject(Router);
  sidebarStatus = this.sideBarService.sideBarIsOpen;
  contentToShow = this.sideBarService.contentToShow;

  onCloseSideNav = () => {
    this.sideBarService.closeSidebar();
  };

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.sideBarService.currentRoute.set(event.urlAfterRedirects);
      });
  }
}
