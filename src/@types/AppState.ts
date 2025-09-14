import type { Lead } from "./Lead";
import type { Opportunity } from "./Opportunity";

export interface AppState {
  leads: Lead[];
  opportunities: Opportunity[];
  isLoading: boolean;
  error: string | null;
  selectedLeadId: number | null;
  filters: {
    searchQuery: string;
    status: string; // 'all' or leadStatus
  };
}

export type AppAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Lead[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "SELECT_LEAD"; payload: number | null }
  | { type: "UPDATE_FILTERS"; payload: { name: string; value: string } }
  | { type: "UPDATE_LEAD_SUCCESS"; payload: Lead }
  | {
      type: "UPDATE_LEAD_FAILURE";
      payload: { originalLead: Lead; error: string };
    }
  | {
      type: "CONVERT_TO_OPPORTUNITY";
      payload: { leadId: number; opportunity: Opportunity };
    };
