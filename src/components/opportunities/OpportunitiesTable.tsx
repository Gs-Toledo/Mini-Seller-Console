import type { Opportunity } from "../../@types/Opportunity";

interface OpportunitiesTableProps {
  opportunities: Opportunity[];
  onRemove: (id: string) => void;
}

export const OpportunitiesTable = ({
  opportunities,
  onRemove,
}: OpportunitiesTableProps) => {
  if (opportunities.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Opportunities</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Opportunity Name
              </th>
              <th scope="col" className="px-6 py-3">
                Account
              </th>
              <th scope="col" className="px-6 py-3">
                Stage
              </th>
              <th scope="col" className="px-6 py-3 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((opp) => (
              <tr key={opp.id} className="bg-gray-800 border-b border-gray-700">
                <td className="px-6 py-4 font-medium text-white">{opp.name}</td>
                <td className="px-6 py-4">{opp.accountName}</td>
                <td className="px-6 py-4">{opp.stage}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onRemove(opp.id)}
                    className="font-medium text-red-500 hover:text-red-400"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
