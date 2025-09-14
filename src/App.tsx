import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { fetchLeads } from "./api/leadsApi";
import { Spinner } from "./components/commom/Spinner";
import type { Lead } from "./@types/Lead";
import type { Opportunity } from "./@types/Opportunity";
import { LeadDetailPanel } from "./components/leads/LeadDetailPanel";
import { Tab, Tabs } from "./components/commom/Tabs";
import { useAppContext } from "./hooks/useAppContext";
import { useProcessedData } from "./hooks/useProcessedData";
import { LeadsView } from "./components/views/LeadsView";
import { OpportunitiesView } from "./components/views/OpportunitiesView";

function App() {
  const { state, dispatch } = useAppContext();
  const { isLoading, error, selectedLeadId } = state;

  const [activeTab, setActiveTab] = useState<"leads" | "opportunities">(() => {
    const savedTab = localStorage.getItem("seller-console-active-tab");
    if (savedTab === "leads" || savedTab === "opportunities") {
      return savedTab;
    }
    return "leads";
  });

  useEffect(() => {
    localStorage.setItem("seller-console-active-tab", activeTab);
  }, [activeTab]);

  const [isPanelMounted, setIsPanelMounted] = useState(false);

  const { processedLeads, paginatedLeads, paginatedOpportunities } =
    useProcessedData(state);

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

  const handleSort = (key: keyof Lead) => {
    const direction =
      state.sortConfig.key === key && state.sortConfig.direction === "asc"
        ? "desc"
        : "asc";
    dispatch({ type: "SET_SORT_CONFIG", payload: { key, direction } });
  };

  useEffect(() => {
    if (selectedLeadId) {
      setIsPanelMounted(true);
    } else {
      const timer = setTimeout(() => setIsPanelMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [selectedLeadId]);

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

  const handleRemoveOpportunity = (id: string) => {
    if (window.confirm("Do you really want to remove this Opportunity?")) {
      dispatch({ type: "REMOVE_OPPORTUNITY", payload: id });
    }
  };

  const handleConvertLead = (leadToConvert: Lead) => {
    const newOpportunity: Opportunity = {
      id: `opp_${new Date().getTime()}`,
      name: `${leadToConvert.name} - ${leadToConvert.company}`, 
      accountName: leadToConvert.company,
      stage: "Discovery",
    };
    dispatch({
      type: "CONVERT_TO_OPPORTUNITY",
      payload: { leadId: leadToConvert.id, opportunity: newOpportunity },
    });
  };

  const selectedLead = useMemo(() => {
    return state.leads.find((lead) => lead.id === selectedLeadId);
  }, [state.leads, selectedLeadId]);

  const renderContent = () => {
    if (isLoading) return <Spinner />;
    if (error)
      return <p className="text-center text-red-400 p-4">Erro: {error}</p>;
    return (
      <>
        {activeTab === "leads" && (
          <LeadsView
            processedLeads={processedLeads}
            paginatedLeads={paginatedLeads}
            sortConfig={state.sortConfig}
            leadsPagination={state.leadsPagination}
            filters={state.filters}
            onSort={handleSort}
            onSelectLead={handleSelectLead}
            onFilterChange={handleFilterChange}
            dispatch={dispatch}
          />
        )}
        {activeTab === "opportunities" && (
          <OpportunitiesView
            paginatedOpportunities={paginatedOpportunities}
            totalOpportunities={state.opportunities.length}
            opportunitiesPagination={state.opportunitiesPagination}
            onRemove={handleRemoveOpportunity}
            dispatch={dispatch}
          />
        )}
      </>
    );
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      {error && (
        <div className="bg-red-500 text-white text-center p-2">
          <strong>Error:</strong> {error}
        </div>
      )}
      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Mini Seller Console</h1>
        </header>

        <Tabs>
          <Tab
            isActive={activeTab === "leads"}
            onClick={() => setActiveTab("leads")}
          >
            Leads ({state.leads.length})
          </Tab>
          <Tab
            isActive={activeTab === "opportunities"}
            onClick={() => setActiveTab("opportunities")}
          >
            Opportunities ({state.opportunities.length})
          </Tab>
        </Tabs>

        <div className="mt-4">{renderContent()}</div>

        {isPanelMounted && selectedLead && (
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
