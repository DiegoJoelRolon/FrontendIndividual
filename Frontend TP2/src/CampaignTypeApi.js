import urls from "../src/ApiUrls.js";

async function getCampaignTypes() {

  const url= urls.getCampaignType
    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const datareturned = await response.json();
      return datareturned;
    } catch {
      console.error("Error fetching data:", error);
    }

}
const CampaignType = {
    Get: getCampaignTypes
}

export default CampaignType;