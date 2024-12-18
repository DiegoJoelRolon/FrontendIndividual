import urls from "../src/ApiUrls.js";
async function getUsers() {
    const url = urls.getUser;
    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
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
const Users = {
    Get: getUsers
}

export default Users;