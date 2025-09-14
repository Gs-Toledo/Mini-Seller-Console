import { useState, useEffect } from "react";
import type { Lead } from "../../@types/Lead";
import { useAppContext } from "../../hooks/UseAppContext";
import { isValidEmail } from "../../utils/validator";
import { updateLead } from "../../api/leadsApi";

interface LeadDetailPanelProps {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
  onConvert: (lead: Lead) => void;
}

export const LeadDetailPanel = ({
  lead,
  isOpen,
  onClose,
  onConvert,
}: LeadDetailPanelProps) => {
  const { dispatch } = useAppContext();

  const [formData, setFormData] = useState({
    email: lead.email,
    status: lead.status,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData({ email: lead.email, status: lead.status });
    setError(null);
  }, [lead]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!isValidEmail(formData.email)) {
      setError("Invalid Email Format.");
      return;
    }

    const originalLead = { ...lead };
    const optimisticLead: Lead = { ...lead, ...formData };

    dispatch({ type: "UPDATE_LEAD_SUCCESS", payload: optimisticLead });

    setError(null);
    setIsSaving(true);

    try {
      await updateLead(lead.id, formData);
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (err) {
      dispatch({
        type: "UPDATE_LEAD_FAILURE",
        payload: { originalLead: originalLead, error: (err as Error).message },
      });
      setError((err as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ease-in-out
              ${isOpen ? "bg-black/50" : "bg-black/0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Panel */}
      {/* FIXME: Fix panel animation */}
      <div
        className={`
        fixed top-0 right-0 h-full w-full max-w-md bg-gray-800 shadow-xl z-50 p-6 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between pb-4 border-b border-gray-600">
          <h2 className="text-2xl font-bold">{lead.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            &times;
          </button>
        </header>

        <div className="flex-grow overflow-y-auto mt-6">
          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-400">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full mt-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-400">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full mt-1 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Unqualified">Unqualified</option>
              </select>
            </div>

            <p>
              <strong className="text-gray-400">Company:</strong> {lead.company}
            </p>
            <p>
              <strong className="text-gray-400">Source:</strong> {lead.source}
            </p>
            <p>
              <strong className="text-gray-400">Score:</strong> {lead.score}
            </p>
          </div>
        </div>

        {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

        <footer className="pt-4 mt-auto border-t border-gray-600 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onConvert(lead)}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-150"
          >
            Convert to Opportunity
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-150 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </footer>
      </div>
    </>
  );
};
