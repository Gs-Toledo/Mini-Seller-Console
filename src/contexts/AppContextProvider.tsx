import {  useReducer, type ReactNode } from "react";
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
    default:
      return state;
  }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};


