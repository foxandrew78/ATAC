import { Routes } from '@angular/router';
import { PassdownComponent } from './content/passdown/passdown.component';
import { ATACComponent } from './content/atac/atac.component';
import { ARCCComponent } from './content/arcc/arcc.component';
import { OperationsComponent } from './content/operations/operations.component';
import { EngineeringComponent } from './content/engineering/engineering.component';

export const routes: Routes = [
  {
    path: 'ATAC',
    loadComponent: () =>
      import('./content/atac/atac.component').then((mod) => mod.ATACComponent),
  },
  {
    path: 'ATAC/new',
    loadComponent: () =>
      import('./content/atac/atac.component').then((mod) => mod.ATACComponent),
    title: 'ATAC',
  },
  {
    path: 'ARCC',
    loadComponent: () =>
      import('./content/arcc/arcc.component').then((mod) => mod.ARCCComponent),
    title: 'ARCC',
  },
  {
    path: 'passdown',
    loadComponent: () =>
      import('./content/passdown/passdown.component').then(
        (mod) => mod.PassdownComponent
      ),
    title: 'Passdown',
  },
  {
    path: 'operations',
    loadComponent: () =>
      import('./content/operations/operations.component').then(
        (mod) => mod.OperationsComponent
      ),
    title: 'Operations',
  },
  {
    path: 'engineering',
    loadComponent: () =>
      import('./content/engineering/engineering.component').then(
        (mod) => mod.EngineeringComponent
      ),
    title: 'Engineering',
  },
];
