import { Routes } from '@angular/router';
import { PassdownComponent } from './passdown/passdown.component';
import { ATACComponent } from './atac/atac.component';
import { ARCCComponent } from './arcc/arcc.component';
import { OperationsComponent } from './operations/operations.component';
import { EngineeringComponent } from './engineering/engineering.component';

export const routes: Routes = [
  { path: 'ATAC', component: ATACComponent },
  { path: 'ARCC', component: ARCCComponent },
  { path: 'passdown', component: PassdownComponent },
  { path: 'operations', component: OperationsComponent },
  { path: 'engineering', component: EngineeringComponent },
];
