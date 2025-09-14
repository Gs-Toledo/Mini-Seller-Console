import leadsData from '../data/leads.json';

export const fetchLeads = () => {
  return new Promise((resolve, reject) => {
    console.log("Fetching leads...");

    setTimeout(() => {
      if (Math.random() < 0.1) { // random error to test how the app handles
        console.error("API Error: Failed to fetch leads.");
        reject(new Error("Error on loading data"));
      } else {
        console.log("Leads fetched successfully.");
        const sortedData = [...leadsData].sort((a, b) => b.score - a.score);
        resolve(sortedData);
      }
    }, 800);
  });
};