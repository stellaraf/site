interface Pagination {
  first: string;
  last: string;
  next: string | null;
  prev: string | null;
}

interface IncidentAttributes {
  acknowledged_at: string | null;
  acknowledged_by: string | null;
  call: boolean;
  cause: string;
  email: boolean;
  escalation_policy_id: string | null;
  http_method: string;
  incident_group_id: number;
  name: string;
  origin_url: string | null;
  push: boolean;
  regions: null;
  resolved_at: string | null;
  resolved_by: string | null;
  response_content: string | null;
  response_options: string | null;
  response_url: string | null;
  screenshot_url: string | null;
  sms: boolean;
  started_at: string;
  url: string;
}

interface Incident {
  attributes: IncidentAttributes;
  id: string;
  relationships: Record<string, Record<string, unknown>>;
  type: string;
}

export interface IncidentsResponse {
  data: Incident[];
  pagination: Pagination;
}
