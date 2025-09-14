import type { Lead } from "../../@types/Lead";

const statusColors = {
  New: "bg-blue-500",
  Contacted: "bg-yellow-500",
  Qualified: "bg-green-500",
  Disqualified: "bg-red-500",
};

export const LeadsTableRow = ({ lead }: {lead: Lead}) => {
  const statusColor = statusColors[lead.status] || "bg-gray-500";

  return (
    <tr className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600 cursor-pointer transition-colors duration-150">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-white whitespace-nowrap"
      >
        {lead.name}
      </th>
      <td className="px-6 py-4">{lead.company}</td>
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${statusColor}`}
        >
          {lead.status}
        </span>
      </td>
      <td className="px-6 py-4 text-right font-bold">{lead.score}</td>
    </tr>
  );
};
