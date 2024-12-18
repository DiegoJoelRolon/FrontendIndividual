import urls from "../src/ApiUrls.js";

async function insertClient(clientdata) {
    const url = urls.client;
    try {
        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
          body: JSON.stringify(clientdata)
        });
        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData);
          throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
        }
    
        const dataReturned = await response.json();
        return dataReturned;
    } 
    catch (error) 
    {
      console.log("Error:", error.message);
      throw error; 
    }

}
async function getAllClients(){
    const url = urls.client;
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
      const data = await response.json();
      return data;
    } 
    
    catch {
      console.error("Error fetching data:", error);
    }
}

const Client ={
    Post : insertClient,
    Get: getAllClients
}

  
export default Client;
