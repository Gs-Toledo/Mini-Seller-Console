import type { Lead, LeadStatus } from "../@types/Lead";
import leadsData from "../data/leads.json";

export const fetchLeads = (): Promise<Lead[]> => {
  return new Promise((resolve) => {
    console.log("Fetching leads...");

    setTimeout(() => {
      console.log("Leads fetched successfully.");
      const typedLeads: Lead[] = leadsData as Lead[];
      const sortedData = [...typedLeads].sort((a, b) => b.score - a.score);
      resolve(sortedData);
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
      const leadIndex = leadsData.findIndex((l) => l.id === leadId);
      if (leadIndex === -1) {
        return reject(new Error("Lead not found."));
      }
      const updatedLead = { ...leadsData[leadIndex], ...updates };
      console.log("Lead updated successfully.");
      resolve(updatedLead as Lead);
    }, 600);
  });
};
