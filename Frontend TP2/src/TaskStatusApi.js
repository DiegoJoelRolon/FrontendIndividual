import urls from "../src/ApiUrls.js";
async function getTaskStatus() {
    const url = urls.getTaskStatus;
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
const TaskStatus = {
    Get: getTaskStatus
}
export default TaskStatus;