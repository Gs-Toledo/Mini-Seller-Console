import { useMemo } from "react";
import type { AppState } from "../@types/AppState";

export const useProcessedData = (state: AppState) => {
  const {
    leads,
    opportunities,
    filters,
    sortConfig,
    leadsPagination,
    opportunitiesPagination,
  } = state;

  const processedLeads = useMemo(() => {
    const filtered = leads
      .filter(
        (lead) =>
          lead.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          lead.company.toLowerCase().includes(filters.searchQuery.toLowerCase())
      )
      .filter((lead) =>
        filters.status === "all" ? true : lead.status === filters.status
      );

    const sorted = [...filtered].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [leads, filters, sortConfig]);

  const paginatedLeads = useMemo(() => {
    const { currentPage, itemsPerPage } = leadsPagination;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedLeads.slice(startIndex, startIndex + itemsPerPage);
  }, [processedLeads, leadsPagination]);

  const paginatedOpportunities = useMemo(() => {
    const { currentPage, itemsPerPage } = opportunitiesPagination;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return opportunities.slice(startIndex, startIndex + itemsPerPage);
  }, [opportunities, opportunitiesPagination]);

  return {
    processedLeads,
    paginatedLeads,
    paginatedOpportunities,
  };
};
