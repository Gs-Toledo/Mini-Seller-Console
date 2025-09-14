import React from "react";
import { OpportunitiesTable } from "../opportunities/OpportunitiesTable";
import { PaginationControls } from "../commom/PaginationControls";
import type { Opportunity } from "../../@types/Opportunity";
import type { AppState } from "../../@types/AppState";
import type { AppAction } from "../../@types/AppState";

interface OpportunitiesViewProps {
  paginatedOpportunities: Opportunity[];
  totalOpportunities: number;
  opportunitiesPagination: AppState["opportunitiesPagination"];
  onRemove: (id: string) => void;
  dispatch: React.Dispatch<AppAction>;
}

export const OpportunitiesView = ({
  paginatedOpportunities,
  totalOpportunities,
  opportunitiesPagination,
  onRemove,
  dispatch,
}: OpportunitiesViewProps) => {
  return (
    <>
      <OpportunitiesTable
        opportunities={paginatedOpportunities}
        onRemove={onRemove}
      />
      <PaginationControls
        currentPage={opportunitiesPagination.currentPage}
        itemsPerPage={opportunitiesPagination.itemsPerPage}
        totalItems={totalOpportunities}
        onPageChange={(page) =>
          dispatch({
            type: "SET_OPPORTUNITIES_PAGINATION",
            payload: { currentPage: page },
          })
        }
        onItemsPerPageChange={(size) =>
          dispatch({
            type: "SET_OPPORTUNITIES_PAGINATION",
            payload: { itemsPerPage: size, currentPage: 1 },
          })
        }
      />
    </>
  );
};
