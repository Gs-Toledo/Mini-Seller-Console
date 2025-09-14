export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: LeadStatus;
}

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Disqualified"