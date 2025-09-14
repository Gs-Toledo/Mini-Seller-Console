export interface Opportunity {
  id: string;
  name: string;
  accountName: string;
  stage: Stage
  amount?: number;
}

export type Stage = "Discovery" | "Proposal" | "Negotiation" | "Closed";
