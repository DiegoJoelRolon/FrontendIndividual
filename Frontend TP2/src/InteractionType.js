import urls from "../src/ApiUrls.js";
async function getInteractionTypes() {
    const url = urls.getInteractionType ;
    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        body: JSON.stringify(data)
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
const InteractionType = {
    Get: getInteractionTypes
}
export default InteractionType;