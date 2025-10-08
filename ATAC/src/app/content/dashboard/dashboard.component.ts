import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { ERRORS } from '../../shared/models/dash.model';
import { DashService } from '../../shared/services/dash.service';

// export interface OhvError {
//   device: string;
//   error: string;
//   time: string;
// }
// const OHV_ERRORS: OhvError[] = [
//   { device: 'OHV101', error: '9302', time: '13:54' },
// ];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, MatTableModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private dashboardService = inject(DashService);
  displayedColumnsStocker: string[] = ['device', 'error_text', 'time'];
  displayedColumnsOHV: string[] = [
    'device',
    'error_code',
    'error_text',
    'time',
  ];
  displayedColumnsCLW: string[] = ['device', 'error_text', 'time'];
  displayedColumnsStatus: string[] = [
    'time',
    'tool_id',
    'comm_status',
    'status',
    'mode',
    'time_in_status',
  ];

  ohv_error_dataSource = this.dashboardService.ohv_dataSource;
  stocker_error_dataSource = this.dashboardService.stocker_dataSource;
  clw_error_dataSource = this.dashboardService.clw_dataSource;
  equipment_status_dataSource =
    this.dashboardService.equipment_status_dataSource;
}
