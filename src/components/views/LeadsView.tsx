import React from "react";
import { LeadsTable } from "../leads/LeadsTable";
import { PaginationControls } from "../commom/PaginationControls";
import type { Lead } from "../../@types/Lead";
import type { AppState } from "../../@types/AppState";
import type { AppAction } from "../../@types/AppState";

interface LeadsViewProps {
  processedLeads: Lead[];
  paginatedLeads: Lead[];
  sortConfig: AppState["sortConfig"];
  leadsPagination: AppState["leadsPagination"];
  filters: AppState["filters"];
  onSort: (key: keyof Lead) => void;
  onSelectLead: (id: number) => void;
  onFilterChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  dispatch: React.Dispatch<AppAction>;
}

export const LeadsView = ({
  processedLeads,
  paginatedLeads,
  sortConfig,
  leadsPagination,
  filters,
  onSort,
  onSelectLead,
  onFilterChange,
  dispatch,
}: LeadsViewProps) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 my-4">
        <input
          type="text"
          name="searchQuery"
          placeholder="Search for name of company..."
          value={filters.searchQuery}
          onChange={onFilterChange}
          className="flex-grow bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="status"
          value={filters.status}
          onChange={onFilterChange}
          className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Disqualified">Disqualified</option>
        </select>
      </div>

      <LeadsTable
        leads={paginatedLeads}
        onSelectLead={onSelectLead}
        onSort={onSort}
        sortConfig={sortConfig}
      />
      <PaginationControls
        currentPage={leadsPagination.currentPage}
        itemsPerPage={leadsPagination.itemsPerPage}
        totalItems={processedLeads.length}
        onPageChange={(page) =>
          dispatch({
            type: "SET_LEADS_PAGINATION",
            payload: { currentPage: page },
          })
        }
        onItemsPerPageChange={(size) =>
          dispatch({
            type: "SET_LEADS_PAGINATION",
            payload: { itemsPerPage: size, currentPage: 1 },
          })
        }
      />
    </>
  );
};
