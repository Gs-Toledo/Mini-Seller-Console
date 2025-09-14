import { useEffect, useReducer, type ReactNode } from "react";
import type { AppState } from "../@types/AppState";
import { AppContext } from "./AppContext";
import { appReducer, initialState } from "./AppReducer";

const getInitialState = (): AppState => {
  const finalState = { ...initialState };
  try {
    const persistedFilters = localStorage.getItem("seller-console-filters");
    if (persistedFilters) {
      finalState.filters = JSON.parse(persistedFilters);
    }

    const persistedLeadPagination = localStorage.getItem(
      "seller-console-lead-pagination"
    );
    if (persistedLeadPagination) {
      finalState.leadsPagination = {
        ...initialState.leadsPagination,
        ...JSON.parse(persistedLeadPagination),
      };
    }

    const persistedSort = localStorage.getItem("seller-console-sort");
    if (persistedSort) finalState.sortConfig = JSON.parse(persistedSort);

    const persistedOpportunities = localStorage.getItem(
      "seller-console-opportunities"
    );
    if (persistedOpportunities)
      finalState.opportunities = JSON.parse(persistedOpportunities);
  } catch (error) {
    console.error("Failed to parse state from localStorage", error);
    localStorage.removeItem("seller-console-filters");
    localStorage.removeItem("seller-console-pagination");
  }
  return finalState;
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
      localStorage.setItem(
        "seller-console-sort",
        JSON.stringify(state.sortConfig)
      );
    } catch (error) {
      console.error("Failed to save sort config to localStorage", error);
    }
  }, [state.sortConfig]);

  useEffect(() => {
    try {
      const paginationToSave = {
        itemsPerPage: state.leadsPagination.itemsPerPage,
      };
      localStorage.setItem(
        "seller-console-lead-pagination",
        JSON.stringify(paginationToSave)
      );
    } catch (error) {
      console.error("Failed to save pagination to localStorage", error);
    }
  }, [state.leadsPagination.itemsPerPage]);

  useEffect(() => {
    try {
      localStorage.setItem(
        "seller-console-opportunities",
        JSON.stringify(state.opportunities)
      );
    } catch (error) {
      console.error("Failed to save opportunities to localStorage", error);
    }
  }, [state.opportunities]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
