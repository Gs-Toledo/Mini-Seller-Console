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
  sortConfig: { key: "score", direction: "desc" },
  pagination: { currentPage: 1, itemsPerPage: 10 },
};

const getInitialState = (): AppState => {
  const finalState = { ...initialState };
  try {
    const persistedFilters = localStorage.getItem("seller-console-filters");
    if (persistedFilters) {
      finalState.filters = JSON.parse(persistedFilters);
    }

    const persistedPagination = localStorage.getItem(
      "seller-console-pagination"
    );
    if (persistedPagination) {
      finalState.pagination = {
        ...initialState.pagination,
        ...JSON.parse(persistedPagination),
      };
    }
  } catch (error) {
    console.error("Failed to parse state from localStorage", error);
    localStorage.removeItem("seller-console-filters");
    localStorage.removeItem("seller-console-pagination");
  }
  return finalState;
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
        pagination: { ...state.pagination, currentPage: 1 },
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
    case "SET_SORT_CONFIG":
      return { ...state, sortConfig: action.payload };
    case "SET_PAGINATION":
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload },
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

  useEffect(() => {
    try {
      const paginationToSave = { itemsPerPage: state.pagination.itemsPerPage };
      localStorage.setItem(
        "seller-console-pagination",
        JSON.stringify(paginationToSave)
      );
    } catch (error) {
      console.error("Failed to save pagination to localStorage", error);
    }
  }, [state.pagination.itemsPerPage]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
