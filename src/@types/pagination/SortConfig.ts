import type { Lead } from "../Lead";

export type SortDirection = 'asc' | 'desc';
export interface SortConfig {
  key: keyof Lead;
  direction: SortDirection;
}
