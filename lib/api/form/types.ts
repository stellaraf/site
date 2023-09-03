export type SFDCLead = {
  encoding: "UTF-8";
  /** SFDC Organization ID */
  oid: string;
  /** Contact First Name */
  first_name?: string;
  /** Contact Last Name */
  last_name?: string;
  /** Account Name */
  company?: string;
  /** Contact Email Address */
  email?: string;
  /** Contact Phone Number */
  phone?: string;
  /** Derived country from Cloudflare object */
  country?: string;
  /** SFDC do not call field */
  doNotCall?: 1;
  /** SFDC lead source field */
  lead_source?: string;
  /** Case Subject */
  subject?: string;
  /** Case Description */
  description?: string;
  /** Custom field - Web Form Metadata */
  "00N3j00000FccT7"?: string;
  /** Enable SFDC debugging */
  debug?: 1;
  /** Email to receive debugging reports */
  debugEmail?: string;
  retURL: string;
};

type SFDCCaseStatus =
  | "New"
  | "Technician Assigned"
  | "Discovering Solution"
  | "Scheduled"
  | "Implementing Solution"
  | "Pending Customer Approval"
  | "Escalated"
  | "Awaiting Customer Response"
  | "Customer Responded"
  | "Closed"
  | "Reopened"
  | "Canceled";

type SFDCCaseType = "Request" | "Incident" | "Production Down";

export type SFDCCase = {
  encoding: "UTF-8";
  /** SFDC Organization ID */
  orgid: string;
  /** Case Status (initial) */
  status: SFDCCaseStatus;
  /** Case Type */
  type: SFDCCaseType;
  /** Contact First & Last Name */
  name?: string;
  /** Account Name */
  company?: string;
  /** Contact Email Address */
  email?: string;
  /** Contact Phone Number */
  phone?: string;
  /** Case Subject */
  subject?: string;
  /** Case Description */
  description?: string;
  /** Custom field `Case__Comment` */
  "00N3j00000FccHG"?: string;
  /** Enable SFDC debugging */
  debug?: 1;
  /** Email to receive debugging reports */
  debugEmail?: string;
};

export interface UserData {
  /** Parsed User-Agent browser information, if available */
  Browser?: string;
  /** Parsed User-Agent device information, if available */
  Device?: string;
  /** Parsed User-Agent OS information, if available */
  OS?: string;
  /** Raw User-Agent string, if the above 3 fields are not available/parsable */
  "User Agent"?: string;
}
