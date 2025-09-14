import { useEffect, useMemo, type ChangeEvent } from "react";
import { LeadsTable } from "./components/leads/LeadsTable";
import { fetchLeads } from "./api/leadsApi";
import { Spinner } from "./components/commom/Spinner";
import { useAppContext } from "./hooks/UseAppContext";
import type { Lead } from "./@types/Lead";
import type { Opportunity } from "./@types/Opportunity";
import { OpportunitiesTable } from "./components/opportunities/OpportunitiesTable";
import { LeadDetailPanel } from "./components/leads/LeadDetailPanel";

function App() {
  const { state, dispatch } = useAppContext();
  const { leads, opportunities, isLoading, error, filters, selectedLeadId } =
    state;

  useEffect(() => {
    const loadLeads = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const data = await fetchLeads();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: (err as Error).message });
      }
    };

    loadLeads();
  }, [dispatch]);

  const filteredLeads = useMemo(() => {
    return leads
      .filter(
        (lead) =>
          lead.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          lead.company.toLowerCase().includes(filters.searchQuery.toLowerCase())
      )
      .filter((lead) =>
        filters.status === "all" ? true : lead.status === filters.status
      );
  }, [leads, filters]);

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    dispatch({
      type: "UPDATE_FILTERS",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleSelectLead = (id: number) => {
    const newSelectedId = selectedLeadId === id ? null : id;
    dispatch({ type: "SELECT_LEAD", payload: newSelectedId });
  };

  const handleClosePanel = () => {
    dispatch({ type: "SELECT_LEAD", payload: null });
  };

  const handleConvertLead = (leadToConvert: Lead) => {
    const newOpportunity: Opportunity = {
      id: `opp_${new Date().getTime()}`,
      name: `${leadToConvert.company} - Opportunity`,
      accountName: leadToConvert.company,
      stage: "Discovery",
    };
    dispatch({
      type: "CONVERT_TO_OPPORTUNITY",
      payload: { leadId: leadToConvert.id, opportunity: newOpportunity },
    });
  };

  const selectedLead = useMemo(() => {
    return leads.find((lead) => lead.id === selectedLeadId);
  }, [leads, selectedLeadId]);

  const renderContent = () => {
    if (isLoading) return <Spinner />;
    if (error)
      return <p className="text-center text-red-400 p-4">Erro: {error}</p>;
    return <LeadsTable leads={filteredLeads} onSelectLead={handleSelectLead} />;
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <main className="max-w-4xl mx-auto p-4 sm:p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Mini Seller Console</h1>
          <p className="text-gray-400">
            Selected Lead ID: {selectedLeadId || "None"}
          </p>
        </header>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            name="searchQuery"
            placeholder="Search for name of company..."
            value={filters.searchQuery}
            onChange={handleFilterChange}
            className="flex-grow bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Unqualified">Unqualified</option>
          </select>
        </div>

        <div className="mt-4">{renderContent()}</div>

        <OpportunitiesTable opportunities={opportunities} />

        {selectedLead && (
          <LeadDetailPanel
            lead={selectedLead}
            isOpen={!!selectedLeadId}
            onClose={handleClosePanel}
            onConvert={handleConvertLead}
          />
        )}
      </main>
    </div>
  );
}

export default App;
