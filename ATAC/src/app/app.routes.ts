import { Routes } from '@angular/router';
import { PassdownComponent } from './content/passdown/passdown.component';
import { ATACComponent } from './content/atac/atac.component';
import { ARCCComponent } from './content/arcc/arcc.component';
import { OperationsComponent } from './content/operations/operations.component';
import { EngineeringComponent } from './content/engineering/engineering.component';

export const routes: Routes = [
  { path: 'ATAC', component: ATACComponent },
  { path: 'ARCC', component: ARCCComponent },
  { path: 'passdown', component: PassdownComponent },
  { path: 'operations', component: OperationsComponent },
  { path: 'engineering', component: EngineeringComponent },
];
