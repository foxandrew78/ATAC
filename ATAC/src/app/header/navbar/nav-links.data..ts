import { buttonList, linksList } from './navbar.model';

export const LINKS_LIST: linksList[] = [
  { text: 'ATAC', destination: 'ATAC' },
  { text: 'ARCC', destination: 'ARCC' },
  { text: 'Passdown', destination: 'passdown' },
  { text: 'Operations', destination: 'operations' },
  { text: 'Engineering', destination: 'engineering' },
];

export const BUTTON_LIST: buttonList[] = [
  { type: 'link', icon: 'home', link: '/' },
  { type: 'action', icon: 'save' },
  { type: 'link', icon: 'people', link: '/passdown' },
  { type: 'openSidebar', icon: 'list', contentToShow: 'links' },
  { type: 'openSidebar', icon: 'settings', contentToShow: 'settings' },
];
