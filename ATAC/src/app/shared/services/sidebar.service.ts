import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarStatus = signal(false);
  private contentRequested = signal<'settings' | 'links'>('settings');
  currentRoute = signal('');

  sideBarIsOpen = this.sidebarStatus.asReadonly();
  contentToShow = this.contentRequested.asReadonly();

  openSidebar = (contentToShow: 'settings' | 'links') => {
    this.contentRequested.set(contentToShow);
    this.sidebarStatus.set(true);
  };
  closeSidebar = () => {
    this.sidebarStatus.set(false);
  };
}
