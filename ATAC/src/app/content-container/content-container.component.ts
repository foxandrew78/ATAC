import { Component, inject, OnInit, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarService } from '../shared/services/sidebar.service';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-content-container',
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet],
  templateUrl: './content-container.component.html',
  styleUrl: './content-container.component.scss',
})
export class ContentContainerComponent {
  private sideBarService = inject(SidebarService);
  sidebarStatus = this.sideBarService.sideBarIsOpen;

  onCloseSideNav = (method: 'esc' | 'backdrop') => {
    this.sideBarService.toggleSidebar(method);
  };

  //? I wrote this code to update the class based on the route so that I could colour the background of the routes without padding etc - it works, but there is still a fex px of padding at the top that I can't figure out just yet!
  /*
  router = new Router();
  currentRoute: string = '';
  requiredClass = signal('');

  updateBodyClass() {
    this.requiredClass.set(this.currentRoute.slice(1));
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
        this.updateBodyClass();
      });
  }
      */
  //! To set the class in the html - add this: [classList]="requiredClass()" (i.e. set the classlist to the signal I created)
}
