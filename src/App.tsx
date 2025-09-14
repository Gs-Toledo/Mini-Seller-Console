import { useState, useEffect } from "react";
import { LeadsTable } from "./components/leads/LeadsTable";
import { fetchLeads } from "./api/leadsApi";
import { Spinner } from "./components/commom/Spinner";

function App() {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeads = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchLeads();
        setLeads(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadLeads();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <Spinner />;
    }
    if (error) {
      return <p className="text-center text-red-400 p-4">Error: {error}</p>;
    }
    return <LeadsTable leads={leads} />;
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <main className="max-w-4xl mx-auto p-4 sm:p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-100">
            Mini Seller Console
          </h1>
          <p className="text-gray-400">Triage Leads and Opportunities</p>
        </header>

        {/* TODO: ADD filters and Search */}

        <div className="mt-4">{renderContent()}</div>

        {/* TODO: Add Opportunity Table */}
      </main>
    </div>
  );
}

export default App;
