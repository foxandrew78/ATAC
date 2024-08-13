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
      import('./content/atac/atac-new/atac-new.component').then(
        (mod) => mod.AtacNewComponent
      ),
    title: titlePre + 'Create a new ATAC',
  },
  {
    path: 'ATAC/modify',
    pathMatch: 'full',
    redirectTo: 'ATAC',
  },
  {
    path: 'ATAC/:id',
    loadComponent: () =>
      import('./content/atac/atac-detail/atac-detail.component').then(
        (mod) => mod.AtacDetailComponent
      ),
    title: titlePre + 'View ATAC',
  },
  {
    path: 'ATAC/modify/:id',
    loadComponent: () =>
      import('./content/atac/atac.component').then((mod) => mod.ATACComponent),
    title: titlePre + 'Modify ATAC',
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
