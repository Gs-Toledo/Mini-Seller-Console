import { useEffect, useReducer, type ReactNode } from "react";
import type { AppAction, AppState } from "../@types/AppState";
import { AppContext } from "./AppContext";

const initialState: AppState = {
  leads: [],
  opportunities: [],
  isLoading: true,
  error: null,
  selectedLeadId: null,
  filters: {
    searchQuery: "",
    status: "all",
  },
};

const getInitialState = (): AppState => {
  try {
    const persistedFilters = localStorage.getItem("seller-console-filters");
    if (persistedFilters) {
      return { ...initialState, filters: JSON.parse(persistedFilters) };
    }
  } catch (error) {
    console.error("Failed to parse filters from localStorage", error);
  }
  return initialState;
};

const appReducer = (state: AppState, action: AppAction): AppState => {
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
        selectedLeadId: null,
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, getInitialState());

  useEffect(() => {
    try {
      localStorage.setItem(
        "seller-console-filters",
        JSON.stringify(state.filters)
      );
    } catch (error) {
      console.error("Failed to save filters to localStorage", error);
    }
  }, [state.filters]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
