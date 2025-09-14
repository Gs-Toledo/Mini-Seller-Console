import { createContext } from "react";
import type { AppAction, AppState } from "../@types/AppState";

export const AppContext = createContext<
  { state: AppState; dispatch: React.Dispatch<AppAction> } | undefined
>(undefined);