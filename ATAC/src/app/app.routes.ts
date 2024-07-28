import { Routes } from '@angular/router';

const titlePre = 'SAR.Next - ';

export const routes: Routes = [
  {
    path: 'ATAC',
    loadComponent: () =>
      import('./content/atac/atac.component').then((mod) => mod.ATACComponent),
    title: titlePre + 'ATAC',
  },
  {
    path: 'ATAC/new',
    loadComponent: () =>
      import('./content/atac/atac.component').then((mod) => mod.ATACComponent),
    title: titlePre + 'Creat a new ATAC',
  },
  {
    path: 'ARCC',
    loadComponent: () =>
      import('./content/arcc/arcc.component').then((mod) => mod.ARCCComponent),
    title: titlePre + 'ARCC',
  },
  {
    path: 'passdown',
    loadComponent: () =>
      import('./content/passdown/passdown.component').then(
        (mod) => mod.PassdownComponent
      ),
    title: titlePre + 'Passdown',
  },
  {
    path: 'operations',
    loadComponent: () =>
      import('./content/operations/operations.component').then(
        (mod) => mod.OperationsComponent
      ),
    title: titlePre + 'Operations',
  },
  {
    path: 'engineering',
    loadComponent: () =>
      import('./content/engineering/engineering.component').then(
        (mod) => mod.EngineeringComponent
      ),
    title: titlePre + 'Engineering',
  },
];
