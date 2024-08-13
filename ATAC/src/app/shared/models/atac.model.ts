export interface ATAC {
  id: number;
  status: 'open' | 'closed';
  // level: number;
  date_opened: string;
  owner?: string;
  DPO?: string;
  site?: string;
  device_type?: 'OHV' | 'stocker' | 'CLW';
  device: string;
  error_code?: string;
  problem_statement: string;
  detection?: string;
  ideal_state?: string;
  current_state?: string;
  known_factors?: string;
  containment?: string;
  unknown_factors?: string;
  models?: {
    id: number;
    user: string;
    date_opened: string;
    summary: string;
    details: string;
  }[];
  detail: string;
  utp_criteria?: string;
  root_cause?: string;
  watch_it_plan?: string;
  lessons_learned?: string;
  ARs?: {
    id: number;
    description: string;
    open_date: string;
    close_date: string;
    owner: string;
  }[];
}
