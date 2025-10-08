import { inject, Injectable, signal } from '@angular/core';
import { ERRORS, STATUS } from '../models/dash.model';
import { MatTableDataSource } from '@angular/material/table';

const OHV_ERROR_DATA: ERRORS[] = [
  {
    device: 'OHV1234',
    device_type: 'OHV',
    error_code: '9302',
    error_text: 'Carrier Handoff',
    error_time: '15:43',
  },
  {
    device: 'OHV567',
    device_type: 'OHV',
    error_code: '9406',
    error_text: 'Carrier Fall Detect',
    error_time: '15:48',
  },
];
const STOCKER_ERROR_DATA: ERRORS[] = [
  {
    device: 'TRN1234',
    device_type: 'stocker',
    error_code: '9302',
    error_text: 'Unexpected load appeared on manual input port while loading.',
    error_time: '15:41',
  },
  {
    device: 'TRN1312',
    device_type: 'stocker',
    error_code: '9302',
    error_text: 'Purge loss',
    error_time: '15:45',
  },
  {
    device: 'TRN1313',
    device_type: 'stocker',
    error_code: '9302',
    error_text: 'Purge loss',
    error_time: '15:45',
  },
  {
    device: 'TRN1314',
    device_type: 'stocker',
    error_code: '9302',
    error_text: 'Purge loss',
    error_time: '15:45',
  },
  {
    device: 'TRN1315',
    device_type: 'stocker',
    error_code: '9302',
    error_text: 'Purge loss',
    error_time: '15:45',
  },
  {
    device: 'TRN1316',
    device_type: 'stocker',
    error_code: '9302',
    error_text: 'Purge loss',
    error_time: '15:45',
  },
  {
    device: 'TRN1317',
    device_type: 'stocker',
    error_code: '9302',
    error_text: 'Purge loss',
    error_time: '15:45',
  },
];

const CLW_ERROR_DATA: ERRORS[] = [];

const EQUIP_STATUS: STATUS[] = [
  {
    time: '10/8/2025 1:33:45 AM',
    tool_id: 'SSR302',
    comm_status: 'Idle',
    status: 'OutOnly',
    mode: 'Auto',
    time_in_status: '10',
  },
  {
    time: '10/8/2025 1:21:55 AM',
    tool_id: 'MON006',
    comm_status: 'OK',
    status: 'PndInh',
    mode: 'Auto',
    time_in_status: '42',
  },
  {
    time: '10/7/2025 11:22:15 PM',
    tool_id: 'TRN1116B',
    comm_status: 'Idle',
    status: '33A2',
    mode: 'ERR',
    time_in_status: '55',
  },
  {
    time: '10/7/2025 11:13:45 PM',
    tool_id: 'TRN1624A',
    comm_status: 'Idle',
    status: 'Offline',
    mode: 'Auto',
    time_in_status: '69',
  },
  {
    time: '10/7/2025 10:23:45 PM',
    tool_id: 'SSR112',
    comm_status: 'Idle',
    status: 'OutOnly',
    mode: 'Auto',
    time_in_status: '103',
  },
];

@Injectable({ providedIn: 'root' })
export class DashService {
  ohv_dataSource = OHV_ERROR_DATA;
  stocker_dataSource = STOCKER_ERROR_DATA;
  clw_dataSource = CLW_ERROR_DATA;
  equipment_status_dataSource = EQUIP_STATUS;
  fetchingData = signal<boolean>(true);
  backendError = signal<string>('');

  loadErrors = () => {};
}
