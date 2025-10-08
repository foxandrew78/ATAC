export interface ERRORS {
  device_type: 'OHV' | 'stocker' | 'CLW';
  device: string;
  error_code: string;
  error_text: string;
  error_time: string;
}
export interface STATUS {
  time: string;
  tool_id: string;
  comm_status: string;
  status: string;
  mode: string;
  time_in_status: string;
}
