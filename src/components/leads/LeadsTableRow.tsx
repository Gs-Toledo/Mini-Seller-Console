import type { Lead } from "../../@types/Lead";

interface LeadsTableRowProps {
  lead: Lead;
  onSelectLead: (id: number) => void;
}

const statusColors = {
  New: "bg-blue-500",
  Contacted: "bg-yellow-500",
  Qualified: "bg-green-500",
  Disqualified: "bg-red-500",
};

export const LeadsTableRow = ({ lead, onSelectLead }: LeadsTableRowProps) => {
  const statusColor = statusColors[lead.status] || "bg-gray-500";

  return (
    <tr
      className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600 cursor-pointer transition-colors duration-150"
      onClick={() => onSelectLead(lead.id)}
    >
      <td
        className="px-6 py-4 font-medium text-white whitespace-nowrap block sm:table-cell"
        data-label="Name"
      >
        {lead.name}
      </td>
      <td className="px-6 py-4 block sm:table-cell" data-label="Company">
        {lead.company}
      </td>
      <td className="px-6 py-4 block sm:table-cell" data-label="Status">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${statusColor}`}
        >
          {lead.status}
        </span>
      </td>
      <td
        className="px-6 py-4 font-bold block sm:table-cell sm:text-right"
        data-label="Score"
      >
        <span className="sm:hidden text-gray-400 mr-2">Score:</span>
        {lead.score}
      </td>
    </tr>
  );
};
