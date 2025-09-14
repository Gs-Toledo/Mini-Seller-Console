import type { Lead } from "../../@types/Lead";
import { LeadsTableRow } from "./LeadsTableRow";

export const LeadsTable = ({ leads }: {leads: Lead[]}) => {
  if (leads.length === 0) {
    return <p className="text-center text-gray-400 p-4">Nenhum lead encontrado.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs text-gray-400 uppercase bg-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Company</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3 text-right">Score</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => (
            <LeadsTableRow key={lead.id} lead={lead} />
          ))}
        </tbody>
      </table>
    </div>
  );
};