export interface linksList {
  text: string;
  destination: string;
}

export interface buttonList {
  type: 'action' | 'link' | 'openSidebar' | 'closeSidebar';
  icon: string;
  link?: string;
  contentToShow?: 'settings' | 'links';
}
