import type { Lead, LeadStatus } from "./Lead";
import type { Opportunity } from "./Opportunity";
import type { PaginationConfig } from "./pagination/PaginationConfig";
import type { SortConfig } from "./pagination/SortConfig";

export interface AppState {
  leads: Lead[];
  opportunities: Opportunity[];
  isLoading: boolean;
  error: string | null;
  selectedLeadId: number | null;
  filters: {
    searchQuery: string;
    status: "all" | LeadStatus; // 'all' or leadStatus
  };
  sortConfig: SortConfig;
  leadsPagination: PaginationConfig;
  opportunitiesPagination: PaginationConfig;
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
    }
  | { type: "SET_SORT_CONFIG"; payload: SortConfig }
  | { type: "SET_LEADS_PAGINATION"; payload: Partial<PaginationConfig> }
  | { type: "REMOVE_OPPORTUNITY"; payload: string }
  | {
      type: "UPDATE_OPPORTUNITY";
      payload: { id: string; updates: Partial<Opportunity> };
    }
  | {
      type: "SET_OPPORTUNITIES_PAGINATION";
      payload: Partial<PaginationConfig>;
    };
