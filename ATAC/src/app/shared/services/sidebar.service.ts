import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarStatus = signal(false);
  sideBarIsOpen = this.sidebarStatus.asReadonly();

  toggleSidebar = (toggleMethod: 'button' | 'backdrop' | 'esc') => {
    toggleMethod === 'button'
      ? this.sidebarStatus.set(!this.sidebarStatus())
      : this.sidebarStatus.set(false);
  };
}
