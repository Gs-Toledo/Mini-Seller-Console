import type { Lead } from "../@types/Lead";
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
