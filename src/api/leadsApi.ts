import type { Lead, LeadStatus } from "../@types/Lead";
import leadsData from "../data/leads.json";

export const fetchLeads = (): Promise<Lead[]> => {
  return new Promise((resolve, reject) => {
    console.log("Fetching leads...");

    setTimeout(() => {
      if (Math.random() < 0.1) {
        // random error to test how the app handles
        console.error("API Error: Failed to fetch leads.");
        reject(new Error("Error on loading data"));
      } else {
        console.log("Leads fetched successfully.");
        const typedLeads: Lead[] = leadsData as Lead[];
        const sortedData = [...typedLeads].sort((a, b) => b.score - a.score);
        resolve(sortedData);
      }
    }, 800);
  });
};

export const updateLead = (
  leadId: number,
  updates: { email?: string; status?: LeadStatus }
): Promise<Lead> => {
  return new Promise((resolve, reject) => {
    console.log(`Updating lead ${leadId}...`);
    setTimeout(() => {
      if (Math.random() < 0.2) {
        // Fail chance

        console.error(`API Error: Failed to update lead ${leadId}.`);
        reject(new Error("Failed to persist data, random error. Try again."));
      } else {
        const leadIndex = leadsData.findIndex((l) => l.id === leadId);
        if (leadIndex === -1) {
          return reject(new Error("Lead not found."));
        }
        const updatedLead = { ...leadsData[leadIndex], ...updates };
        console.log("Lead updated successfully.");
        resolve(updatedLead as Lead);
      }
    }, 600);
  });
};
