import type { AppAction, AppState } from "../@types/AppState";

export const initialState: AppState = {
  leads: [],
  opportunities: [],
  isLoading: true,
  error: null,
  selectedLeadId: null,
  filters: {
    searchQuery: "",
    status: "all",
  },
  sortConfig: { key: "score", direction: "desc" },
  leadsPagination: { currentPage: 1, itemsPerPage: 10 },
  opportunitiesPagination: { currentPage: 1, itemsPerPage: 5 },
};

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, isLoading: false, leads: action.payload };
    case "FETCH_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "SELECT_LEAD":
      return { ...state, selectedLeadId: action.payload };
    case "UPDATE_FILTERS":
      return {
        ...state,
        leadsPagination: { ...state.leadsPagination, currentPage: 1 },
        filters: {
          ...state.filters,
          [action.payload.name]: action.payload.value,
        },
      };
    case "UPDATE_LEAD_SUCCESS":
      return {
        ...state,
        leads: state.leads.map((lead) =>
          lead.id === action.payload.id ? action.payload : lead
        ),
        selectedLeadId: null,
      };
    case "UPDATE_LEAD_FAILURE":
      return {
        ...state,
        error: action.payload.error,
        leads: state.leads.map((lead) =>
          lead.id === action.payload.originalLead.id
            ? action.payload.originalLead
            : lead
        ),
      };
    case "CONVERT_TO_OPPORTUNITY":
      return {
        ...state,
        leads: state.leads.filter((lead) => lead.id !== action.payload.leadId),
        opportunities: [...state.opportunities, action.payload.opportunity],
        opportunitiesPagination: {
          ...state.opportunitiesPagination,
          currentPage: 1,
        },
        selectedLeadId: null,
      };

    case "REMOVE_OPPORTUNITY":
      return {
        ...state,
        opportunities: state.opportunities.filter(
          (opp) => opp.id !== action.payload
        ),
      };
    case "SET_OPPORTUNITIES_PAGINATION":
      return {
        ...state,
        opportunitiesPagination: {
          ...state.opportunitiesPagination,
          ...action.payload,
        },
      };
    case "SET_SORT_CONFIG":
      return { ...state, sortConfig: action.payload };
    case "SET_LEADS_PAGINATION":
      return {
        ...state,
        leadsPagination: { ...state.leadsPagination, ...action.payload },
      };
    default:
      return state;
  }
};
