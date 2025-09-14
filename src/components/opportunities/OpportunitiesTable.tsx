import { useState } from "react";
import type { Opportunity, Stage } from "../../@types/Opportunity";
import { useAppContext } from "../../hooks/useAppContext";

interface OpportunitiesTableProps {
  opportunities: Opportunity[];
  onRemove: (id: string) => void;
}

export const OpportunitiesTable = ({
  opportunities,
  onRemove,
}: OpportunitiesTableProps) => {
  const { dispatch } = useAppContext();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Opportunity>>({});

  const handleEditClick = (opportunity: Opportunity) => {
    setEditingId(opportunity.id);
    setEditData({ stage: opportunity.stage, amount: opportunity.amount });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleSave = (id: string) => {
    dispatch({
      type: "UPDATE_OPPORTUNITY",
      payload: {
        id,
        updates: { ...editData, amount: Number(editData.amount) || undefined },
      },
    });
    setEditingId(null);
    setEditData({});
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const stageOptions: Stage[] = [
    "Discovery",
    "Proposal",
    "Negotiation",
    "Closed",
  ];

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
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((opp) => (
              <tr key={opp.id} className="bg-gray-800 border-b border-gray-700">
                {editingId === opp.id ? (
                  // Edit Mode
                  <>
                    <td className="px-6 py-4 font-medium text-white">
                      {opp.name}
                    </td>
                    <td className="px-6 py-4">{opp.accountName}</td>
                    <td className="px-6 py-4">
                      <select
                        name="stage"
                        value={editData.stage}
                        onChange={handleInputChange}
                        className="bg-gray-700 border border-gray-600 rounded-md px-2 py-1 w-full"
                      >
                        {stageOptions.map((stage) => (
                          <option key={stage} value={stage}>
                            {stage}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        name="amount"
                        placeholder="Ex: 5000"
                        value={editData.amount || ""}
                        onChange={handleInputChange}
                        className="bg-gray-700 border border-gray-600 rounded-md px-2 py-1 w-full"
                      />
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleSave(opp.id)}
                        className="font-medium text-green-500 hover:text-green-400"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="font-medium text-gray-400 hover:text-gray-200"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  // Read Mode
                  <>
                    <td className="px-6 py-4 font-medium text-white">
                      {opp.name}
                    </td>
                    <td className="px-6 py-4">{opp.accountName}</td>
                    <td className="px-6 py-4">{opp.stage}</td>
                    <td className="px-6 py-4">
                      {opp.amount
                        ? opp.amount.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })
                        : "—"}
                    </td>
                    <td className="px-6 py-4 text-right space-x-4 whitespace-nowrap">
                      <button
                        onClick={() => handleEditClick(opp)}
                        className="font-medium text-blue-500 hover:text-blue-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onRemove(opp.id)}
                        className="font-medium text-red-500 hover:text-red-400"
                      >
                        Remove
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
