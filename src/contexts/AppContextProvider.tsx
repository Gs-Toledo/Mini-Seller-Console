import type { ReactNode } from "react";
import type { AppState } from "../@types/AppState";
import { AppContext } from "./AppContext";
import { appReducer, initialState } from "./AppReducer";
import { usePersistedReducer } from "../hooks/usePersistedReducer";

const KEYS_TO_PERSIST: (keyof AppState)[] = [
  "filters",
  "sortConfig",
  "leadsPagination",
  "opportunitiesPagination",
  "opportunities",
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = usePersistedReducer(
    appReducer,
    initialState,
    "seller-console-state",
    KEYS_TO_PERSIST
  );

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
