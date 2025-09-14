import type { Lead } from "../../@types/Lead";
import type { SortConfig } from "../../@types/pagination/SortConfig";
import { LeadsTableRow } from "./LeadsTableRow";

export interface LeadsTableProps {
  leads: Lead[];
  onSelectLead: (id: number) => void;
  onSort: (key: keyof Lead) => void;
  sortConfig: SortConfig;
}

const SortIcon = ({ direction }: { direction?: "asc" | "desc" }) => {
  if (!direction) return <span className="text-gray-600">↕</span>;
  return <span>{direction === "asc" ? "↑" : "↓"}</span>;
};

export const LeadsTable = ({ leads, onSelectLead, onSort, sortConfig }: LeadsTableProps) => {
  if (leads.length === 0) {
    return <p className="text-center text-gray-400 p-4">No Leads Found.</p>;
  }

  const headers: { key: keyof Lead; label: string }[] = [
    { key: "name", label: "Name" },
    { key: "company", label: "Company" },
    { key: "status", label: "Status" },
    { key: "score", label: "Score" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs text-gray-400 uppercase bg-gray-700 hidden sm:table-header-group">
          <tr>
            {headers.map((header) => (
              <th key={header.key} scope="col" className="px-6 py-3">
                <button
                  onClick={() => onSort(header.key)}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  {header.label}
                  <SortIcon
                    direction={
                      sortConfig.key === header.key
                        ? sortConfig.direction
                        : undefined
                    }
                  />
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <LeadsTableRow
              key={lead.id}
              lead={lead}
              onSelectLead={onSelectLead}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
