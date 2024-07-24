export interface linksList {
  text: string;
  destination: string;
}

export interface buttonList {
  type: 'action' | 'link';
  icon: string;
  link?: string;
  openSidebar?: boolean;
}
