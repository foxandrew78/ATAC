import { linksList } from './links-list-data.model';

export const ATACLinks: linksList[] = [
  { destination: 'new', text: 'Create a New ATAC' },
  { destination: 'open', text: 'Show Open ATACs' },
  { destination: 'closed', text: 'Show Closed ATACs' },
  { destination: 'passdown', text: 'passdown', relativeTo: '/' },
];
